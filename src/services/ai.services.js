import { GoogleGenAI } from "@google/genai";

export const generateRoadmap = async (goal) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Create a detailed learning roadmap for ${goal}. Return ONLY valid JSON.`,
  });

  const cleaned = response.text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleaned);
};