import { env } from "@/app/env/client";
import { getFunctionCalls } from "./getFunctionCalls";
import { generateSummary } from "./generateSummary";
import { FunctionCall } from "@google/genai";

export interface Reply {
  message: string;
  error: boolean;
  functions?: FunctionCall[];
}

interface Request {
  query: string;
}

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = env.NEXT_PUBLIC_GEMINI_API_KEY;
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

const instructions = `You are Zi Shen's portfolio assistant. Your name is Zi Shen. Your job is to help users with their question regarding Zi Shen's portfolio in a slightly playful way, like you are a friendly tour guide of the portfolio. You can provide information about the projects, the portfolio website, and details about the portfolio owner.
Here are some basic information regarding the portfolio website: 
1. the portfolio url is www.zishenchan.com with 5 recent projects: personal portfolio AI assistance (that's you!), automation manager (an internship project with Rohde and Schwarz in Singapore Changi Business Park), XCuisite Fullstack website (also known as xcuisite or xcuisite website), hologram chatbot (currently in production, no URL), and SCCC - Interactive Articulatory Accent Database (often referred to as SCCC, a part-time project at NTU).
2. When referring the user, use 'you' and refer yourself as 'I' or 'me'. 
3. You may receive a actions that will be done by you. If there is any function to be executed, notify the user. When there is no action to execute, you can provide answer directly.
Here are some rules for your response: 
1. Focus on the context of the conversation and which project the user is asking about (if applicable).
2. Give your answer without any Markdown formatting such as bold (**), italics (*), or code blocks. 
3. Keep your answer short and concise, strictly limit your response to 3 sentences. 
4. Do not include any current context in your response, only answer the user's question.
That is all of the instructions.`;

let conversationHistory = "";
let context = "";
let lastBotResponse = "";

async function generatePrompt(userInput: string, functionName?: string) {
  conversationHistory = `Bot: ${lastBotResponse}\nUser: ${userInput}\n`;
  // generate a new context based on the new input and response.
  context = await generateSummary(context, conversationHistory);

  const prompt = `
      Instruction:
      ${instructions}
      ${context && `Context: \n${context}`}
      ${functionName ? `Action: ${functionName}` : ""}
      User: ${userInput}
      `;
  // console.log(prompt);
  return prompt;
}

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

export async function fetchChatbotReply(request: Request) {
  try {
    const functionsObj = await getFunctionCalls(request);
    console.log(functionsObj);
    const query = await generatePrompt(
      request.query,
      functionsObj.functionCalls
        ? functionsObj.functionCalls[0].name
        : undefined
    );
    const result = await chatSession.sendMessage(query);
    const replyText = result.response.text();
    lastBotResponse = replyText;
    return {
      message: replyText,
      error: false,
      functions: functionsObj.functionCalls,
    };
  } catch (err) {
    console.error(err);
    return {
      message:
        "Oops, it seems that something is happening from my end. Maybe try again later?",
      error: true,
    };
  }
}
