"use server";

import { FunctionCall, GoogleGenAI } from "@google/genai";
import { envServer } from "@/app/env/server";
import { functionCallList } from "./functionCalls";
import { getErrorMessage } from "@/app/utils/handleReport";
import { FUNCTION_CALL_SYN_PROMPT } from "./config";
import { envClient } from "@/app/env/client";

const GOOGLE_CONSOLE_API_KEY = envServer.GOOGLE_CONSOLE_API_KEY;

export interface fetchFunctionCallResponse {
  functionCall: FunctionCall | undefined;
  functionMessage: string;
  error: boolean;
}

export async function fetchFunctionCalls(conversation: string) {
  // console.log(`Query: ${request.query}`);
  const maxRetries = 3;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const ai = new GoogleGenAI({ apiKey: GOOGLE_CONSOLE_API_KEY });
      const response = await ai.models.generateContent({
        model: envClient.NEXT_PUBLIC_GEMINI_MODEL_FUNC_CALL,
        contents: `
    instructions: 
    ${FUNCTION_CALL_SYN_PROMPT}
    conversation: 
    ${conversation}`,
        config: {
          tools: [
            {
              functionDeclarations: [...functionCallList],
            },
          ],
        },
      });
      const funcCall = response.functionCalls
        ? response.functionCalls[0]
        : undefined;
      return {
        functionCall: funcCall,
        functionMessage: response.text,
        error: false,
      } as fetchFunctionCallResponse;
    } catch (err) {
      const errMsg = getErrorMessage(err);
      console.error(errMsg);
    }
  }
  return {
    functionCall: undefined,
    functionMessage: "Error happened when fetching functions",
    error: true,
  } as fetchFunctionCallResponse;
}
