"use server";

import { envServer } from "@/app/env/server";
import { getErrorMessage } from "@/app/utils/handleReport";
import { GoogleGenAI } from "@google/genai";
import { fetchWithRetry } from "@/app/utils/fetchWithRetry";

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
    // console.log(`Search Query: ${response.text}`);

    return response.text ?? fallbackQuery;
  } catch (err) {
    const errMsg = getErrorMessage(err);
    console.error(
      `Error while fetching search query: ${errMsg}. Using user last message`
    );
    return fallbackQuery;
  }
}

export async function fetchSearchResults(query: string, limit: number = 3) {
  // No need for a try...catch here, as fetchWithRetry handles it.
  const res = await fetchWithRetry(envServer.TXTAI_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Added header for clarity
    },
    body: JSON.stringify({
      "query": query,
      "limit": limit,
    }),
  });

  // Now we can safely check res and res.response
  if (!res.response || res.errMsg) {
    console.error(`Error while fetching search results: ${res.errMsg}`);
    return [];
  }

  if (!Array.isArray(res.response)) {
    console.error(
      `Unexpected response format: ${JSON.stringify(res.response)}`
    );
    return [];
  }

  // We can be confident res.response has our data
  const searchResults = res.response;
  return [
    ...searchResults?.map((result: { "answer": string }) => result.answer),
  ];
}
