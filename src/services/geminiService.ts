import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface GeminiResponse {
  measure_value: number;
  measure_guid: string;
  image_url: string;
}

export const geminiService = async (image: string): Promise<GeminiResponse> => {
  if (!!process.env.GEMINI_API_KEY) {
    const googleAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = googleAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  const result = {
    measure_value: 1000,
    measure_guid: "guid",
    image_url: "url",
  };

  return result;
};
