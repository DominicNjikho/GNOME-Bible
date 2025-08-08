import { GoogleGenAI } from "@google/genai";

// This should be securely managed and not hardcoded.
// For this context, we assume process.env.API_KEY is available.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set. Please provide it in your environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const fetchCommentary = async (reference: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Commentary is unavailable.";
  }
  
  try {
    const prompt = `Provide a brief theological commentary for ${reference}. Focus on its historical context, key themes, and significance. Keep the tone academic but accessible. Do not use markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching commentary from Gemini API:", error);
    if (error instanceof Error) {
        return `Failed to generate commentary: ${error.message}`;
    }
    return "An unknown error occurred while generating commentary.";
  }
};
