"use server";
import { env } from "@/app/env/client";
import { envServer } from "@/app/env/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { ChatInstance } from "@/components/chatbot/demoChatHistory";
import { FunctionCall } from "@google/genai";
import { getErrorMessage } from "@/app/utils/handleReport";
import { Conversation } from "@/app/hooks/useConversation";
import { chatToConversation } from "@/app/utils/ChatToConversation";
import { generatePrompt } from "./generatePrompt";
import {
  fetchFunctionCalls,
  fetchFunctionCallResponse,
} from "./fetchFunctionCalls";
import {
  fetchSearchResults,
  fetchSearchQueryPrompt,
} from "./fetchSearchResults";

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
  const MODEL_NAME = env.NEXT_PUBLIC_GEMINI_MODEL_NAME;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
  });

  const generationConfig = {
    temperature: 0.25,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 120,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [{ text: "Hi" }],
      },
      {
        role: "model",
        parts: [{ text: "Hi, I'm Zi Shen. How can I help you?" }],
      },
    ],
  });
  return chatSession;
}

const chatSession = initiateChatSession();

export async function fetchChatbotReply(request: Request): Promise<Reply> {
  // console.log(request.chatHistory);
  try {
    const conversationHistory = request.chatHistory.map((chat: ChatInstance) =>
      chatToConversation(chat)
    ) as Conversation[];
    const conversationHistoryString = conversationHistory
      .map((conv: Conversation) => conv.role + ": " + conv.content)
      .join("\n");
    // console.log(conversationHistory);
    const searchQuery = await fetchSearchQueryPrompt(
      conversationHistoryString,
      conversationHistory[conversationHistory.length - 1].content
    );
    const searchResults = await fetchSearchResults(searchQuery);
    const functionCallResponse: fetchFunctionCallResponse =
      await fetchFunctionCalls(conversationHistoryString);

    const prompt = await generatePrompt(
      conversationHistoryString,
      searchResults,
      functionCallResponse.functionCall,
      functionCallResponse.functionMessage
    );
    const result = await chatSession.sendMessage(prompt);
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
      message:
        "Oops, it seems that something is happening from my end. Maybe try again later?",
      error: true,
    };
  }
}
