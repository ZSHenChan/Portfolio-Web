"use server";

import { ResultInstance } from "./fetchSearchResults";
import { FunctionCall } from "@google/genai";

export async function generatePrompt(
  conversationHistoryString: string,
  searchResults: ResultInstance[] = [],
  functionCall: FunctionCall | undefined
) {
  const prompt = `[Conversation History]
${conversationHistoryString}
[Function Call Details]
${functionCall ? JSON.stringify(functionCall) : "No Function Call\n"}
[Available Information]
${
  searchResults.length > 0
    ? JSON.stringify(searchResults)
    : "No Available Information"
}`;

  return prompt;
}
