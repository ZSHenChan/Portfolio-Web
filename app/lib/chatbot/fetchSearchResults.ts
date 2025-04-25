"use server";

import { envServer } from "@/app/env/server";
import { getErrorMessage } from "@/app/utils/handleErrorMsg";
import { GoogleGenAI } from "@google/genai";

export async function fetchSearchQueryPrompt(
  conversationHistoryString: string,
  fallbackQuery: string
) {
  const GOOGLE_CONSOLE_API_KEY = envServer.GOOGLE_CONSOLE_API_KEY;
  const instructions = `Given the following conversation history and the current user question, rewrite the user question to be a standalone question that includes all necessary context from the history. Only output the rewritten question.`;
  const ai = new GoogleGenAI({ apiKey: GOOGLE_CONSOLE_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: `
      instructions: 
      ${instructions}
      conversation: 
      ${conversationHistoryString}`,
    });
    console.log(`Search Query: ${response.text}`);

    return response.text ?? fallbackQuery;
  } catch (err) {
    const errMsg = getErrorMessage(err);
    console.error(`Error while fetching search query: ${errMsg}`);
    return fallbackQuery;
  }
}

export async function fetchSearchResults(query: string, limit: number = 1) {
  try {
    const res = await fetch(
      `${envServer.TXTAI_BASE_URL}/api/search?limit=${limit}&query=${query}`
    );
    const body = await res.json();
    if (body.error) {
      console.error("No search result found");
      return [];
    }
    for (const result of body.results) {
      console.log(`Search Result ${result.score}: ${result.answer}`);
    }
    return [
      ...body?.results.map((result: { "answer": string }) => result.answer),
    ];
  } catch (err) {
    const errMsg = getErrorMessage(err);
    console.error(`Error while fetching search results: ${errMsg}`);
    return [];
  }
}
