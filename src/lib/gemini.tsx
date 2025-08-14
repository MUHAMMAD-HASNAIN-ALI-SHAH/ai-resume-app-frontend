import { GoogleGenAI } from "@google/genai";

console.log(
  "Gemini AI initialized with API key:",
  import.meta.env.VITE_GEMINI_API_KEY
);

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export default ai;
