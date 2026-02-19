
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getMLInsight(features: any) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As an ML Expert, analyze these environmental features for potential rainfall in India: ${JSON.stringify(features)}. 
      Provide a brief agricultural recommendation based on the weather conditions.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching ML insight:", error);
    return "Error generating expert insight. Please check your inputs.";
  }
}

export async function explainCodeConcept(concept: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the Machine Learning concept of '${concept}' in the context of the India Rainfall Prediction project for beginners. 
      Keep it educational and structured.`,
    });
    return response.text;
  } catch (error) {
    return "Explanation currently unavailable.";
  }
}
