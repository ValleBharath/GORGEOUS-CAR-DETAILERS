import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  }

  async askQuestion(question: string, history: ChatMessage[]) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: question }] }
        ],
        config: {
          systemInstruction: "You are the Gorgeous Car Detailers AI Assistant. You help customers with car detailing questions, maintenance tips, and service inquiries. Use Google Search to provide up-to-date information on car care products and techniques. Be professional, helpful, and maintain the premium brand voice.",
          tools: [{ googleSearch: {} }]
        }
      });

      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
    }
  }
}

export const geminiService = new GeminiService();
