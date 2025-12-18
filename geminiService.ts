
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIInsight = async (type: 'address' | 'transaction', identifier: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Act as a blockchain security expert. Provide a concise analysis of the following ${type}: ${identifier}. 
      Since this is a simulated scan, talk about what a professional would look for in this ${type} (e.g. wash trading patterns, contract complexity, or fund movement). 
      Limit to 3 punchy bullet points.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Analysis currently unavailable. Please check your network connection.";
  }
};

export const analyzeContract = async (codeSnippet: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this smart contract for vulnerabilities: ${codeSnippet}. Provide a safety score from 0 to 100 and list main risks.`,
      });
      return response.text;
    } catch (error) {
      return "Could not perform contract analysis.";
    }
}
