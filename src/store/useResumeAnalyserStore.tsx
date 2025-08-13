import { create } from "zustand";
import pdfToText from "react-pdftotext";
import { toast } from "react-toastify";

interface ResumeAnalyserState {
  form: {
    companyName: string;
    positiontitle: string;
    companyDescription: string;
    file: File | null;
    extractedText: string;
  };
  handleFormStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  submitForm: () => void;
}

const useResumeAnalyserStore = create<ResumeAnalyserState>((set, get) => ({
  form: {
    companyName: "",
    positiontitle: "",
    companyDescription: "",
    file: null,
    extractedText: "",
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
}));

export default useResumeAnalyserStore;
