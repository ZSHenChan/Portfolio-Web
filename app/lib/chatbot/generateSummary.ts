import { env } from "@/app/env/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const summaryModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function generateSummary(context: string, conversationHistory: string) {
  const summaryInstruction = `
  Instructions:
  1. You will receive a previous conversation context, last bot reply and a new question from the same user. Your task is to identify what the user is actually asking and return a context that helps to give the answer.
  2. Your summary should be concise and short, keep in mind that it is very likely the user will ask for more details regarding a project.
  3. The context should write in first person, where I am the bot, and the other person is the user. If empty context means it is the beginning of the conversation.
  4. There are 5 projects presented in the website: personal portfolio AI assistance, automation manager, XCuisite Fullstack website, hologram chatbot, and SCCC - Interactive Articulatory Accent Database.
  5. Include and retain user details such as name and email address in the context. The user may ask to execute some functions, such as sending an email.
  6. Give the context as your only response.
  7. Here is some examples of context: 'The user is asking about the hologram chatbot project.', 'The user is asking more details regarding the automation manager project'. 'The user wih name Youtuber with email address youtuber@youtube.com is asking me to send email to zi shen with title 'Lets connect!'.'
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
  // console.log(`Context: ${resultText}`);

  return resultText;
}

export { generateSummary };
