"use server";

import { FunctionCall, GoogleGenAI } from "@google/genai";
import { envServer } from "@/app/env/server";
import {
  navigateSectionDeclaration,
  sendEmailDeclaration,
  navigateProjectsDeclaration,
  addNewReminderDeclaration,
} from "./functionCalls";

const GOOGLE_CONSOLE_API_KEY = envServer.GOOGLE_CONSOLE_API_KEY;

export interface fetchFunctionCallResponse {
  functionCall: FunctionCall;
  functionMessage: string;
  error: boolean;
}

const dateString = new Date().toISOString().split("T")[0];

const instructions = `
You are a helpful bot that can use functions to perform specific actions. Your primary job is to identify function calls provided, *NOT* to answer user question.
You will receive a conversation between you and a user. Your task is to identify if a function call is necessary.
If the user is showing strong intention to send email to Zi Shen but is missing some required parameters, you MUST:
- List out the missing required information and likely called function name.

Otherwise, *DO NOT* return any response. Simply return empty message.

for 'addNewReminder' funciton, return function when user ask to remind Zi Shen something. Default date is ${dateString}. 
for 'sendEmail' function, only return the function call if the requirements are all met. Otherwise, wait for the user provide needed content.
for 'navigateSection' and 'navigateProject' function, only return the function call if the user explicitly ask to navigate with keywords like 'bring me to' and 'show me'. Otherwise, wait for confirmation from the user with the chatbot.
`;

export async function fetchFunctionCalls(conversation: string) {
  // console.log(`Query: ${request.query}`);
  const ai = new GoogleGenAI({ apiKey: GOOGLE_CONSOLE_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `
    instructions: 
    ${instructions}
    conversation: 
    ${conversation}`,
    config: {
      tools: [
        {
          functionDeclarations: [
            navigateSectionDeclaration,
            sendEmailDeclaration,
            navigateProjectsDeclaration,
            addNewReminderDeclaration,
          ],
        },
      ],
    },
  });
  const funcCall = response.functionCalls ? response.functionCalls[0] : null;
  if (funcCall) {
    console.log(`Function call found`);
    console.log(funcCall);
    console.log(`Function Call Text: ${response.text}`);
  }
  return {
    functionCall: funcCall,
    functionMessage: response.text,
    error: false,
  } as fetchFunctionCallResponse;
}
