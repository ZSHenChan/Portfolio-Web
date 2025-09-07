"use server";

import { ResultInstance } from "./fetchSearchResults";
import { functionCallDict } from "./functionCalls";
import { FunctionCall } from "@google/genai";
import { REPLY_SYN_PROMPT } from "./config";

export async function generatePrompt(
  conversationHistoryString: string,
  searchResults: ResultInstance[] = [],
  functionCall: FunctionCall | undefined,
  functionMessage: string | null = ""
) {
  const functionCallInstruction = functionCall?.name
    ? functionCallDict.get(functionCall.name)
    : "";

  const date = Date();

  const prompt = `
      Instruction:
      ${`Today is ${date}`}
      ${REPLY_SYN_PROMPT}
      ${`Conversation History:
      ${conversationHistoryString}`}
      ${
        functionCall
          ? `Action: ${functionCall.name}\nFunction Call Instruction: ${functionCallInstruction}\n`
          : "No Action\n"
      }
      ${`Action Agent Message:
        ${functionMessage}`}
      ${
        searchResults.length > 0 &&
        `Available Information: \n${searchResults.join(",\n")}`
      }`;

  console.info(`function Message: ${functionMessage}`);
  return prompt;
}
