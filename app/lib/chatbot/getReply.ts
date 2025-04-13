import { env } from "@/app/env/client";
import { getFunctionCalls } from "./getFunctionCalls";
import { executeFunctionCall } from "./executeFunctionCall";

export interface Reply {
  message: string;
  error: boolean;
}

interface Request {
  query: string;
}

import {
  GoogleGenerativeAI,
  // HarmCategory,
  // HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = env.NEXT_PUBLIC_GEMINI_API_KEY;
const MODEL_NAME = env.NEXT_PUBLIC_GEMINI_MODEL_NAME;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: MODEL_NAME,
});

const summaryModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generationConfig = {
  temperature: 0.25,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 120,
  responseMimeType: "text/plain",
};

const instructions = `You are Zi Shen's portfolio assistant. Your name is Zi Shen. Your job is to help users with their question regarding Zi Shen's portfolio in a slightly playful way, like you are a friendly tour guide of the portfolio. You can provide information about the projects, the portfolio website, and details about the portfolio owner.
Here are some basic information regarding the portfolio website: 
1. the portfolio url is www.zishenchan.com 
2. Zi Shen's portfolio website has 5 recent projects: personal portfolio AI assistance (that's you!), automation manager (an internship project with Rohde and Schwarz in Singapore Changi Business Park), XCuisite Fullstack website (also known as xcuisite or xcuisite website), hologram chatbot (currently in production, no URL), and SCCC - Interactive Articulatory Accent Database (often referred to as SCCC, a part-time project at NTU).
3. When referring the user, use 'you' and refer yourself as 'I' or 'me'. 
Here are some rules for your response: 
1. Focus on the context of the conversation and which project the user is asking about (if applicable).
2. Give your answer without any Markdown formatting such as bold (**), italics (*), or code blocks. 
3. Keep your answer short and concise, strictly limit your response to 3 sentences. 
4. Do not include any current context in your response, only answer the user's question.
That is all of the instructions.`;

let conversationHistory = "";
let context = "";
let lastBotResponse = "";

async function generatePrompt(userInput: string) {
  conversationHistory = `User: ${userInput}\nBot: ${lastBotResponse}\n`;
  // generate a summary based on the new input and response.
  await generateSummary();

  // Summary:
  // ${summary}
  const prompt = `
      Instruction:
      ${instructions}
      ${context && `Context: \n${context}`}
      User: ${userInput}
      `;
  // console.log(prompt);
  return prompt;
}

async function generateSummary() {
  const summaryInstruction = `
  Instructions:
  1. You will receive a previous conversation context and a new question from the same user. Your task is to identify what the user is actually asking and return a context that helps to give the answer.
  2. Your summary should be concise and short, keep in mind that it is very likely the user will ask for more details regarding a project.
  3. The context should write in first person, where I am the bot, and the other person is the user. If the provided context is empty, that means it is the beginning of the conversation.
  4. There are 5 projects presented in the website: personal portfolio AI assistance, automation manager, XCuisite Fullstack website, hologram chatbot, and SCCC - Interactive Articulatory Accent Database.
  5. Give the context as your only response.
  6. Here is some examples of context: 'The user is asking about the hologram chatbot project.', 'The user is asking more details about the automation manager project.'
  `;

  const request = `
  Instructions:
  ${summaryInstruction}
  Current context:
  ${context}
  Last Conversation:
  ${conversationHistory}
  `;
  const result = await summaryModel.generateContent(request);
  const resultText = result.response.text();
  // console.log(resultText);
  context = resultText;
  // console.log(`Context: ${context}`);

  return;
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
    const functions = await getFunctionCalls(request);
    executeFunctionCall(functions.functionCalls);
    const query = await generatePrompt(request.query);
    const result = await chatSession.sendMessage(query);
    const replyText = result.response.text();
    lastBotResponse = replyText;
    return { message: replyText, error: false };
  } catch (err) {
    console.error(err);
    return {
      message:
        "Oops, it seems that something is happening from my end. Maybe try again later?",
      error: true,
    };
  }
}
