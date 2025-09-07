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
  fetchSearchQueryPrompt,
  ResultInstance,
} from "./fetchSearchResults";
import {
  REPLY_ERROR_FALLBACK_MSG,
  GEMINI_GENERATION_CONFIG,
  INITIAL_CHAT_HISTORY,
  QUERY_SEARCH_LIMIT,
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
  });

  const chatSession = model.startChat({
    generationConfig: GEMINI_GENERATION_CONFIG,
    history: INITIAL_CHAT_HISTORY,
  });
  return chatSession;
}

const chatSession = initiateChatSession();

const debugMode = true;

export async function fetchChatbotReply(request: Request): Promise<Reply> {
  try {
    const conversationHistoryString = JSON.stringify(request.chatHistory);

    const [functionCallResponse, searchQuery] = await Promise.all([
      fetchFunctionCalls(conversationHistoryString),
      fetchSearchQueryPrompt(
        conversationHistoryString,
        request.chatHistory[request.chatHistory.length - 1].message
      ),
    ]);
    if (debugMode) {
      console.log("=== Fetch Function Call Pass ===");
      if (functionCallResponse.functionCall) {
        console.log(`Function call found`);
        console.log(functionCallResponse.functionCall);
        console.log(
          `Function Call Text: ${functionCallResponse.functionMessage}`
        );
      }
    }

    let searchResults: ResultInstance[] = [];
    if (!functionCallResponse.error && !functionCallResponse.functionCall) {
      if (debugMode) console.log("=== Fetch Search Query Pass ===");
      searchResults = await fetchSearchResults(searchQuery, QUERY_SEARCH_LIMIT);
      if (debugMode) {
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

    const result = await chatSession.sendMessage(prompt);
    console.log("=== Fetch Chatbot Response Pass ===");
    const replyText = result.response.text();
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
