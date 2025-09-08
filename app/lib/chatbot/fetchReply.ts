"use server";
import { envClient } from "@/app/env/client";
import { envServer } from "@/app/env/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { ChatInstance } from "@/components/chatbot/demoChatHistory";
import { FunctionCall } from "@google/genai";
import { getErrorMessage } from "@/app/utils/handleReport";
import { generatePrompt } from "./generatePrompt";
import { fetchFunctionCalls } from "./fetchFunctionCalls";
import {
  fetchSearchResults,
  ResultInstance,
  fetchStructQueryPrompt,
} from "./fetchSearchResults";
import {
  REPLY_ERROR_FALLBACK_MSG,
  GEMINI_GENERATION_CONFIG,
  INITIAL_CHAT_HISTORY,
  QUERY_SEARCH_LIMIT,
  DEBUG_MODE,
  REPLY_SYS_INSTRUCTIONS,
  REPLY_SYN_PROMPT,
} from "./config";

export interface Reply {
  message: string;
  error: boolean;
  functionCall?: FunctionCall;
}

interface Request {
  chatHistory: ChatInstance[];
}

function initiateChatSession() {
  const API_KEY = envServer.GEMINI_API_KEY;
  const MODEL_NAME = envClient.NEXT_PUBLIC_GEMINI_MODEL_MAIN;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: REPLY_SYN_PROMPT,
  });

  const chatSession = model.startChat({
    generationConfig: GEMINI_GENERATION_CONFIG,
    history: INITIAL_CHAT_HISTORY,
  });
  return chatSession;
}

const chatSession = initiateChatSession();

export async function fetchChatbotReply(request: Request): Promise<Reply> {
  try {
    const conversationHistoryString = JSON.stringify(request.chatHistory);

    // const [functionCallResponse, searchQuery] = await Promise.all([
    //   fetchFunctionCalls(conversationHistoryString),
    //   fetchSearchQueryPrompt(
    //     conversationHistoryString,
    //     request.chatHistory[request.chatHistory.length - 1].message
    //   ),
    // ]);
    const [functionCallResponse, searchQuery] = await Promise.all([
      fetchFunctionCalls(conversationHistoryString),
      fetchStructQueryPrompt(
        conversationHistoryString,
        request.chatHistory[request.chatHistory.length - 1].message
      ),
    ]);
    if (DEBUG_MODE) {
      console.log(functionCallResponse);
      console.log(searchQuery);
      console.log("=== Fetch Function Call Pass ===");
      if (functionCallResponse.functionCall) {
        console.log(functionCallResponse.functionCall);
        console.log(
          `Function Call Text: ${functionCallResponse.functionMessage}`
        );
      }
    }

    let searchResults: ResultInstance[] = [];
    if (searchQuery.needSearch && !functionCallResponse.functionCall) {
      console.log("=== Search Query ===");
      searchResults = await fetchSearchResults(
        searchQuery.synthesisQuery,
        QUERY_SEARCH_LIMIT
      );
      if (DEBUG_MODE) {
        console.log("=== Fetch Search Results Pass ===");
        console.log(`Found ${searchResults.length} search results`);
        console.log(searchResults);
      }
    }

    const prompt = await generatePrompt(
      conversationHistoryString,
      searchResults,
      functionCallResponse.functionCall,
      functionCallResponse.functionMessage
    );

    console.log("PROMTPPP");
    console.log(prompt);

    const result = await chatSession.sendMessage(prompt);
    const replyText = result.response.text();
    if (DEBUG_MODE) {
      console.log("=== Fetch Chatbot Response Pass ===");
      console.log(replyText);
      console.log("------------------------------------");
    }
    return {
      message: replyText,
      error: false,
      functionCall: functionCallResponse.functionCall,
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
