"use server";

import { envServer } from "@/app/env/server";
import { getErrorMessage } from "@/app/utils/handleReport";
import { GoogleGenAI } from "@google/genai";
import { fetchWithRetry } from "@/app/utils/fetchWithRetry";
import { envClient } from "@/app/env/client";
import { SEARCH_QUERY_SYN_PROMPT } from "./config";

export interface ResultInstance {
  id: string | null;
  text: string | null;
  answer: string | null;
  score: number | null;
}

interface SearchResponse {
  error: boolean | null;
  message: string | null;
  result: ResultInstance[] | null;
}

export async function fetchSearchQueryPrompt(
  conversationHistoryString: string,
  fallbackQuery: string
) {
  const GOOGLE_CONSOLE_API_KEY = envServer.GOOGLE_CONSOLE_API_KEY;
  const instructions = SEARCH_QUERY_SYN_PROMPT;
  const ai = new GoogleGenAI({ apiKey: GOOGLE_CONSOLE_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: envClient.NEXT_PUBLIC_GEMINI_MODEL_QUERY,
      contents: `
      instructions: 
      ${instructions}
      conversation: 
      ${conversationHistoryString}`,
    });

    console.log(`Conversation:\n ${conversationHistoryString}`);

    return response.text ?? fallbackQuery;
  } catch (err) {
    const errMsg = getErrorMessage(err);
    console.error(
      `Error while fetching search query: ${errMsg}. Using user last message`
    );
    return fallbackQuery;
  }
}

export async function fetchSearchResults(
  query: string,
  limit: number = 3
): Promise<ResultInstance[]> {
  // No need for a try...catch here, as fetchWithRetry handles it.
  console.info(`Query: ${query}`);
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

  if (!res.response || res.errMsg) {
    console.error(`Error while fetching search results: ${res.errMsg}`);
    return [];
  }

  // We can be confident res.response has our data
  const fetchData = res.response as unknown as SearchResponse;
  if (fetchData != null && fetchData.result != null) {
    const searchResults = fetchData.result;
    return [...searchResults];
  }

  return [];
}
