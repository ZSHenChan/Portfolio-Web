import { GoogleGenAI } from "@google/genai";
import { envServer } from "@/app/env/server";
import {
  navigateSectionDeclaration,
  sendEmailDeclaration,
} from "./functionCalls";

const GOOGLE_CONSOLE_API_KEY = envServer.GOOGLE_CONSOLE_API_KEY;

interface Request {
  query: string;
}

export async function getFunctionCalls(request: Request) {
  // console.log(`Query: ${request.query}`);
  const ai = new GoogleGenAI({ apiKey: GOOGLE_CONSOLE_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: request.query,
    config: {
      tools: [
        {
          functionDeclarations: [
            navigateSectionDeclaration,
            sendEmailDeclaration,
          ],
        },
      ],
    },
  });
  // console.log(response.functionCalls);
  return { functionCalls: response.functionCalls, error: false };
}
