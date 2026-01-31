import "server-only";
import { envServer } from "@/app/env/server";
import { GoogleGenAI } from "@google/genai";

export const gemini_client = new GoogleGenAI({
  apiKey: envServer.GEMINI_API_KEY,
});
