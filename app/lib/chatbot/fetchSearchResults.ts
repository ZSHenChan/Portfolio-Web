"use server";

import { envServer } from "@/app/env/server";
import { getErrorMessage } from "@/app/utils/handleReport";
import { GoogleGenAI, Type } from "@google/genai";
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

export interface QueryStructure {
  synthesisQuery: string;
  needSearch: boolean;
}

const ai = new GoogleGenAI({ apiKey: envServer.GOOGLE_CONSOLE_API_KEY });

export async function fetchStructQueryPrompt(
  conversationHistoryString: string,
  fallbackQuery: string
): Promise<QueryStructure> {
  try {
    const response = await ai.models.generateContent({
      model: envClient.NEXT_PUBLIC_GEMINI_MODEL_QUERY,
      contents: `instruction: ${SEARCH_QUERY_SYN_PROMPT}
[Conversation]
${conversationHistoryString}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["needSearch", "synthesisQuery"],
          properties: {
            synthesisQuery: {
              type: Type.STRING,
              description:
                "The synthesized query based on the user current request.",
            },
            needSearch: {
              type: Type.BOOLEAN,
              description:
                "Indicate whether searching for information is needed based on the user question.",
            },
          },
        },
      },
    });

    const jsonString = response.text;
    if (!jsonString) throw new Error("Failed to parse json string");
    const result = JSON.parse(jsonString) as QueryStructure;
    return result;
  } catch (err) {
    const errMsg = getErrorMessage(err);
    console.error(
      `Error while fetching search query: ${errMsg}. Using user last message`
    );
    return {
      synthesisQuery: fallbackQuery,
      needSearch: false,
    } as QueryStructure;
  }
}

export async function fetchSearchQueryPrompt(
  conversationHistoryString: string,
  fallbackQuery: string
) {
  const instructions = SEARCH_QUERY_SYN_PROMPT;

  try {
    const response = await ai.models.generateContent({
      model: envClient.NEXT_PUBLIC_GEMINI_MODEL_QUERY,
      contents: `[conversation]
${conversationHistoryString}`,
      config: { systemInstruction: instructions },
    });

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
