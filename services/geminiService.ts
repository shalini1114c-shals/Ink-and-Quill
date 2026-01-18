
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSupportResponse = async (userMessage: string, context?: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are a customer support agent for "Stationary Things", an Indian stationery and art supply store. 
        Tone: Professional, helpful, and friendly.
        Rules:
        - Currency is ₹ INR.
        - Delivery takes 3-5 days across India.
        - Return Policy: Returns/Exchanges accepted only with unboxing video proof or genuine reasons.
        - Contact: +91 9XXXXXXXXX.
        - Support user queries about orders, products (Pens, Pencils, Art Kits, etc.), and brands (Camlin, Faber-Castell, Cello).
        - Keep answers concise.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI support error:", error);
    return "I'm sorry, I'm having trouble connecting to support. Please try again or call +91 9XXXXXXXXX.";
  }
};
