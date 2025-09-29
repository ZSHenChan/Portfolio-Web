"use server";

import { envServer } from "@/app/env/server";
import { getErrorMessage } from "@/app/utils/handleReport";
import { FunctionCall, GoogleGenAI, Type } from "@google/genai";
import { envClient } from "@/app/env/client";
import { DECIDE_FUNCTION_CALL_SYS_INSTURCTION } from "./config";

export interface FunctionExcDecisionStruct {
  approve: boolean;
  reason: string;
}

const ai = new GoogleGenAI({ apiKey: envServer.GOOGLE_CONSOLE_API_KEY });

export async function fetchExcDecisionStruct(
  conversation: string,
  functionCall: FunctionCall,
  specificDescription: string
): Promise<FunctionExcDecisionStruct> {
  const prompt = `[Conversation]
${conversation}
[Proposed Function Call]
${JSON.stringify(functionCall)}
[Function Description]
${specificDescription}`;

  try {
    const response = await ai.models.generateContent({
      model: envClient.NEXT_PUBLIC_GEMINI_MODEL_FUNC_CALL_APPROVER,
      contents: prompt,
      config: {
        systemInstruction: DECIDE_FUNCTION_CALL_SYS_INSTURCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["approve", "reason"],
          properties: {
            approve: {
              type: Type.BOOLEAN,
            },
            reason: {
              type: Type.STRING,
            },
          },
        },
      },
    });

    const jsonString = response.text;
    if (!jsonString) throw new Error("Failed to parse json string");
    const result = JSON.parse(jsonString) as FunctionExcDecisionStruct;
    console.log(`${result.approve}: ${result.reason}`);
    console.log("=======================");
    return result;
  } catch (err) {
    const errMsg = getErrorMessage(err);
    console.error(
      `Error while fetching search query: ${errMsg}. Using user last message`
    );
    return {
      approve: false,
      reason: "Failed to fetch",
    } as FunctionExcDecisionStruct;
  }
}
