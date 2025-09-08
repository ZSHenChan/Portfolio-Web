"use server";

import { ResultInstance } from "./fetchSearchResults";
import { functionCallMsgDict } from "./functionCalls";
import { FunctionCall } from "@google/genai";
import { REPLY_SYS_INSTRUCTIONS } from "./config";

export async function generatePrompt(
  conversationHistoryString: string,
  searchResults: ResultInstance[] = [],
  functionCall: FunctionCall | undefined,
  functionMessage: string | null = ""
) {
  const functionCallInstruction = functionCall?.name
    ? functionCallMsgDict.get(functionCall.name)
    : "";

  const prompt = `[Conversation History]
${conversationHistoryString}
[Function Call Details]
${
  functionCall
    ? `${functionCall}
    ${functionCallInstruction}`
    : "No Function Call\n"
}
[Function Agent Message]
${functionMessage}
[Available Information]
${
  searchResults.length > 0
    ? JSON.stringify(searchResults)
    : "No Available Information"
}`;

  return prompt;
}
