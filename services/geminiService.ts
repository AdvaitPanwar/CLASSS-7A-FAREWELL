
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async generateHeartfeltRemark(keywords: string): Promise<string> {
    if (!process.env.API_KEY) {
      console.warn("API_KEY not found. Ensure it is set in Vercel Environment Variables.");
      return "Thank you for the wonderful memories, Class 7A!";
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a warm, emotional, and creative farewell remark for a class 7 student based on these keywords: "${keywords}". Keep it under 40 words and make it sound personal and friendly.`,
      });
      // Correct text extraction per SDK guidelines
      return response.text || "Wishing you all the best for the future!";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Wishing you all the best for the future!";
    }
  }

  async summarizeClassMemories(memories: any[]): Promise<string> {
    if (memories.length === 0) return "Our story is just beginning...";
    if (!process.env.API_KEY) return "A collective thank you to everyone in Class 7A.";

    const memoryText = memories.map(m => `${m.name} (${m.category}): ${m.content}`).join('\n');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I have a list of memories from Class 7A students across different categories. Please write a beautiful, collective farewell letter (approx 150 words) that captures the essence of these moments to send to their teacher. 
        Memories:
        ${memoryText}`,
      });
      return response.text || "Thank you everyone for the beautiful journey together.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Thank you everyone for the beautiful journey together.";
    }
  }
}

export const geminiService = new GeminiService();
