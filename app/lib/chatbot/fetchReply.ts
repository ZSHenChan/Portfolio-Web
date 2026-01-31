"use server";
import { envClient } from "@/app/env/client";
import { envServer } from "@/app/env/server";
import { GoogleGenAI } from "@google/genai";
import { ChatInstance } from "@/components/chatbot/demoChatHistory";
import { FunctionCall } from "@google/genai";
import { getErrorMessage } from "@/app/utils/handleReport";
import { generatePrompt } from "./generatePrompt";
import { fetchFunctionCalls } from "./fetchFunctionCalls";
import { funcSysMsgDict } from "./functionCalls";
import {
  // fetchSearchResults,
  // ResultInstance,
  fetchStructQueryPrompt,
} from "./fetchSearchResults";
import {
  REPLY_ERROR_FALLBACK_MSG,
  GEMINI_GENERATION_CONFIG,
  INITIAL_CHAT_HISTORY,
  // QUERY_SEARCH_LIMIT,
  DEBUG_MODE,
} from "./config";
import { fetchExcDecisionStruct } from "./fetchFunctionApproval";
import { FunctionCallType } from "@/app/enums/functionCall";
import path from "path";
import { promises as fs } from "fs";

export interface Reply {
  message: string;
  error: boolean;
  functionCall?: FunctionCall;
  funcSysMsg?: string;
}

interface Request {
  chatHistory: ChatInstance[];
  enableFunctionCalling: boolean;
}

function initiateChatSession() {
  const API_KEY = envServer.GEMINI_API_KEY;
  const MODEL_NAME = envClient.NEXT_PUBLIC_GEMINI_MODEL_MAIN;
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const chatSession = ai.chats.create({
    model: MODEL_NAME,
    history: INITIAL_CHAT_HISTORY,
    config: GEMINI_GENERATION_CONFIG,
  });
  return chatSession;
}

const chatSession = initiateChatSession();

export async function fetchChatbotReply(request: Request): Promise<Reply> {
  try {
    const conversationHistoryString = JSON.stringify(request.chatHistory);

    const [functionCallResponse, searchQuery]: [
      Awaited<ReturnType<typeof fetchFunctionCalls>>,
      Awaited<ReturnType<typeof fetchStructQueryPrompt>>,
    ] = await Promise.all([
      fetchFunctionCalls(conversationHistoryString),
      fetchStructQueryPrompt(
        conversationHistoryString,
        request.chatHistory[request.chatHistory.length - 1].message,
      ),
    ]);

    if (DEBUG_MODE) {
      console.log(`--- Function Call: ${JSON.stringify(functionCallResponse)}`);
      console.log(`--- Struct query: ${JSON.stringify(searchQuery)}`);
    }

    let functionExecApproved = false;
    if (request.enableFunctionCalling && functionCallResponse.functionCall) {
      const functionType = Object.values(FunctionCallType).find(
        (func) => func.name === functionCallResponse.functionCall?.name,
      );
      const funcExecApproveObj = await fetchExcDecisionStruct(
        conversationHistoryString,
        functionCallResponse.functionCall,
        functionType?.description ?? "",
      );
      functionExecApproved = funcExecApproveObj.approve;
      if (DEBUG_MODE) {
        console.log(`--- Func Approver: ${JSON.stringify(funcExecApproveObj)}`);
      }
    }

    // let searchResults: ResultInstance[] = [];
    // if (searchQuery.needSearch && !functionExecApproved) {
    //   searchResults = await fetchSearchResults(
    //     searchQuery.synthesisQuery,
    //     searchQuery.searchQueryLimit | QUERY_SEARCH_LIMIT
    //   );
    //   if (DEBUG_MODE)
    //     console.log(
    //       `--- Azure FunctionApp : Found ${searchResults.length} search results`
    //     );
    // }

    const funcSysMsg = functionCallResponse?.functionCall?.name
      ? funcSysMsgDict.get(functionCallResponse?.functionCall?.name)
      : "";

    const filePath = path.join(process.cwd(), "public", "knowledge.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContents);

    const prompt = await generatePrompt(
      conversationHistoryString,
      JSON.stringify(jsonData),
      functionExecApproved ? functionCallResponse.functionCall : undefined,
    );

    const response = await chatSession.sendMessage({ message: prompt });
    const replyText = response.text;
    if (!replyText) throw new Error("Unable to fetch response");

    return {
      message: replyText,
      error: false,
      functionCall: functionExecApproved
        ? functionCallResponse.functionCall
        : undefined,
      funcSysMsg: funcSysMsg,
    };
  } catch (err) {
    const errMsg = getErrorMessage(err);
    console.error(errMsg);
    return {
      message: REPLY_ERROR_FALLBACK_MSG,
      error: true,
    };
  }
}
