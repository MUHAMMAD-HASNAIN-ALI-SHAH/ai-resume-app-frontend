import { create } from "zustand";
import pdfToText from "react-pdftotext";
import { toast } from "react-toastify";
import ai from "../lib/gemini";

interface ResumeAnalyserState {
  form: {
    companyName: string;
    positiontitle: string;
    companyDescription: string;
    file: File | null;
    extractedText: string;
  };
  submitForAnalysis: boolean;
  submitting: boolean;
  handleFormStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  submitForm: () => void;
  atsString: {
    atsScore: number;
    atsPoints: { point: string; description: string }[];
    atsKeywords: string[];
    atsMissingKeywords: { missingKeyword: string; reason: string }[];
  };
  getResumeATSScore: () => Promise<void>;
  reset: () => void;
}

const useResumeAnalyserStore = create<ResumeAnalyserState>((set, get) => ({
  form: {
    companyName: "",
    positiontitle: "",
    companyDescription: "",
    file: null,
    extractedText: "",
  },
  submitForAnalysis: false,
  submitting: false,
  atsString: {
    atsScore: 0,
    atsPoints: [],
    atsKeywords: [],
    atsMissingKeywords: [],
  },

  handleFormStrings: (e) => {
    const { name, type } = e.target as HTMLInputElement;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;

      if (file) {
        pdfToText(file)
          .then((text) => {
            if (!text) {
              toast.error("No text extracted from the PDF file.");
              return;
            }
            set((state) => ({
              form: { ...state.form, [name]: file, extractedText: text },
            }));
          })
          .catch((err) => {
            console.error("❌ PDF extraction error:", err);
            set((state) => ({
              form: { ...state.form, [name]: file, extractedText: "" },
            }));
          });
      }
    } else {
      set((state) => ({
        form: { ...state.form, [name]: e.target.value },
      }));
    }
  },

  submitForm: () => {
    console.log("Form data:", get().form);
  },

  getResumeATSScore: async () => {
    const { form } = get();
    if (!form.file) {
      toast.error("Please upload a resume file.");
      return;
    }

    if (!form.extractedText) {
      toast.error("No text extracted from the resume file.");
      return;
    }

    try {
      set({ submitting: true, submitForAnalysis: true });

      // 1️⃣ Get Score & Keywords
      const atsResult = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
          You are an ATS scoring engine.

          You MUST ONLY return two things with NO extra text:
          1. A number from 0 to 100 representing the ATS score.
          2. A comma-separated list of the 4 most relevant keywords from the resume for this job.

          Format exactly like this:
          SCORE: <number>
          KEYWORDS: <keyword1>, <keyword2>, <keyword3>, <keyword4>

          companyName: ${form.companyName}
          positionTitle: ${form.positiontitle}
          companyDescription: ${form.companyDescription}

          Resume text:
          ${form.extractedText}
        `,
      });

      // 2️⃣ Get detailed negative points / suggestions
      const atsScoreDescription = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
        You are an ATS scoring engine.

        You gave ${atsResult.text} score to this resume.
        Give me each issue as a JSON array of objects with these keys:
        - "point": short summary of the issue
        - "description": explanation of why this affects ATS score

        Example output:
        [
          {"point": "Missing keywords", "description": "The resume lacks important job-related keywords."},
          {"point": "Poor formatting", "description": "ATS may misread headers or bullet points."}
        ]

        Include at least 5-7 points if applicable. Use negative points only.

        companyName: ${form.companyName}
        positionTitle: ${form.positiontitle}
        companyDescription: ${form.companyDescription}

        Resume text:
        ${form.extractedText}
        `,
      });

      const atsScoreDescriptionMissingKeywords =
        await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `
        You are an ATS scoring engine.

        You gave ${atsResult.text} score to this resume.
        Give me each missing keywords as a JSON array of objects with these keys:

        Example output:
        [
          {"missingKeyword": "keyword1", reason: "This keyword is essential for the job."},
          {"missingKeyword": "keyword2", reason: "This keyword is commonly used in the industry."}
          {"missingKeyword": "keyword3", reason: "This keyword matches the job description."}
        ]

        Include at least 5-7 points if applicable. Use negative points only.

        companyName: ${form.companyName}
        positionTitle: ${form.positiontitle}
        companyDescription: ${form.companyDescription}

        Resume text:
        ${form.extractedText}
        `,
        });

      if (
        !atsResult.text ||
        !atsScoreDescription.text ||
        !atsScoreDescriptionMissingKeywords.text
      ) {
        toast.error("Failed to get ATS score or description.");
        return;
      }

      // 3️⃣ Parse score and keywords
      const scoreMatch = atsResult.text.match(/SCORE:\s*(\d+)/i);
      const keywordsMatch = atsResult.text.match(/KEYWORDS:\s*(.*)/i);

      const atsScore = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
      const atsKeywords = keywordsMatch
        ? keywordsMatch[1].split(",").map((kw) => kw.trim())
        : [];

      // 4️⃣ Parse JSON description points safely
      let atsPoints: { point: string; description: string }[] = [];
      try {
        const cleanedText = atsScoreDescription.text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        atsPoints = JSON.parse(cleanedText);
      } catch (err) {
        console.error(
          "Failed to parse ATS points JSON:",
          err,
          atsScoreDescription.text
        );
      }

      let atsMissingKeywords: { missingKeyword: string; reason: string }[] = [];
      try {
        const cleanedTextMissingKeywords =
          atsScoreDescriptionMissingKeywords.text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        atsMissingKeywords = JSON.parse(cleanedTextMissingKeywords);
      } catch (err) {
        console.error(
          "Failed to parse ATS points JSON:",
          err,
          atsScoreDescription.text
        );
      }

      // 5️⃣ Save structured ATS info in store
      set({
        atsString: {
          atsScore,
          atsKeywords,
          atsPoints,
          atsMissingKeywords,
        },
      });
      set({ submitForAnalysis: true, submitting: false });
    } catch (error) {
      console.error("Error fetching ATS score:", error);
      toast.error("Failed to get ATS score");
    }
  },
  reset: () =>
    set({
      form: {
        companyName: "",
        positiontitle: "",
        companyDescription: "",
        file: null,
        extractedText: "",
      },
      submitForAnalysis: false,
      atsString: {
        atsScore: 0,
        atsPoints: [],
        atsKeywords: [],
        atsMissingKeywords: [],
      },
    }),
}));

export default useResumeAnalyserStore;
