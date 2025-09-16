"use server";

import { FunctionCall, GoogleGenAI } from "@google/genai";
import { envServer } from "@/app/env/server";
import { functionCallList } from "./functionCalls";
import { getErrorMessage } from "@/app/utils/handleReport";
import {
  FETCH_FAIL_FALLBACK_MSG,
  FUNCTION_CALL_SYS_INSTRUCTION,
} from "./config";
import { envClient } from "@/app/env/client";
import { MAX_RETRY_COUNT } from "@/app/config/api";

const GOOGLE_CONSOLE_API_KEY = envServer.GOOGLE_CONSOLE_API_KEY;

export interface fetchFunctionCallResponse {
  functionCall: FunctionCall | undefined;
  functionMessage: string;
  error: boolean;
}

export async function fetchFunctionCalls(conversation: string) {
  for (let attempt = 0; attempt < MAX_RETRY_COUNT; attempt++) {
    try {
      const ai = new GoogleGenAI({ apiKey: GOOGLE_CONSOLE_API_KEY });
      const response = await ai.models.generateContent({
        model: envClient.NEXT_PUBLIC_GEMINI_MODEL_FUNC_CALL,
        contents: conversation,
        config: {
          systemInstruction: FUNCTION_CALL_SYS_INSTRUCTION,
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
    functionMessage: FETCH_FAIL_FALLBACK_MSG,
    error: true,
  } as fetchFunctionCallResponse;
}
