
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateHeartfeltRemark(keywords: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a warm, emotional, and creative farewell remark for a class 7 student based on these keywords: "${keywords}". Keep it under 40 words and make it sound personal and friendly.`,
      });
      return response.text?.trim() || "Thank you for the wonderful memories, Class 7A!";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Wising you all the best for the future!";
    }
  }

  async summarizeClassMemories(memories: any[]): Promise<string> {
    const memoryText = memories.map(m => `${m.name}: ${m.favoriteMoment}`).join('\n');
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I have a list of memories from Class 7A students. Please write a beautiful, collective farewell letter (approx 150 words) that captures the essence of these moments to send to their teacher. 
        Memories:
        ${memoryText}`,
      });
      return response.text?.trim() || "A collective thank you to everyone in Class 7A.";
    } catch (error) {
      return "Thank you everyone for the beautiful journey together.";
    }
  }
}

export const geminiService = new GeminiService();
