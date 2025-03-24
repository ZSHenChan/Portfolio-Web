import { env } from "@/app/env/client";
// import { GoogleGenerativeAI } from "@google/generative-ai";

export interface Reply {
  message: string;
  error: boolean;
}

interface Request {
  query: string;
}

// const genAI = new GoogleGenerativeAI(env.NEXT_PUBLIC_GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({
//   model: env.NEXT_PUBLIC_GEMINI_MODEL_NAME,
//   // systemInstruction:
//   //   "You are Zi Shen's portfolio assistant. Your name is Doey. Your job is to help users with their question regarding Zi Shen's portfolio. Do not answer irrelevant questions.",
// });

// export async function fetchChatbotReply(request: Request): Promise<Reply> {
//   const result = await model.generateContent({
//     contents: [
//       {
//         role: "user",
//         parts: [
//           {
//             text: request.query,
//           },
//         ],
//       },
//     ],
//     generationConfig: {
//       maxOutputTokens: 250,
//       temperature: 0.1,
//     },
//   });
//   const replyText = result.response.text();
//   return { message: replyText };
// }

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

const instructions = `You are Zi Shen's portfolio assistant. Your name is Zi Shen. Your job is to help users with their question regarding Zi Shen's portfolio in a slightly playful way, like you are a friendly tour guide of the portfolio. Do not answer irrelevant questions. 
Here are some basic information regarding the portfolio website: 
1. the portfolio url is www.zishenchan.com 
2. Zi Shen's portfolio website has 5 recent projects: personal portfolio AI assistance (that's you!), automation manager (an internship project with Rohde and Schwarz in Singapore Changi Business Park), XCuisite Fullstack website (also known as xcuisite or xcuisite website), hologram chatbot (currently in production, no URL), and SCCC - Interactive Articulatory Accent Database (often referred to as SCCC, a part-time project at NTU). 
Here are some rules for your response: 
1. If a user's question is unclear, ask for more details before attempting to answer. 
2. Give your answer without any Markdown formatting such as bold (**), italics (*), or code blocks. 
3. Keep your answer short , concise and limit to 3 sentences. 
That is all of the instructions.`;

let conversationHistory = "";
let summary = "";
let context = "";
let lastBotResponse = "";

async function generatePrompt(userInput: string) {
  conversationHistory += `User: ${userInput}\nBot: ${lastBotResponse}\n`;
  // generate a summary based on the new input and response.
  await generateSummary();

  const prompt = `
      Instruction:
      ${instructions}
      Summary:
      ${summary}
      ${context && `Context: \n${context}`}
      User: ${userInput}
      `;
  // console.log(prompt);
  return prompt;
}

async function generateSummary() {
  const summaryInstruction = `summarize the conversation given below in short and concise sentences, provide summary and conversation context in given format: [CONTEXT_START] [Conversation Context] [SUMMARY_START] [Summary]`;

  const request = `
  Instructions:
  ${summaryInstruction}
  Conversation Summary:
  ${summary}
  Last Conversation:
  ${conversationHistory}
  `;
  const result = await summaryModel.generateContent(request);
  const resultText = result.response.text();
  // console.log(resultText);
  const parts = resultText.split("[SUMMARY_START]");
  context = parts[0].replace("[CONTEXT_START]", ""); // conversation context
  // console.log(`Context: ${context}`);
  summary = parts[1]; // summary
  // console.log(`Summary: ${summary}`);
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
