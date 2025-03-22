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

export async function fetchChatbotReply(request: Request) {
  try {
    const result = await chatSession.sendMessage(request.query);
    const replyText = result.response.text();
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
