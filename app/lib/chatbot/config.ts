import { ProjectDemoType } from "@/app/enums/projectDemo";

//* Reply Generation (Main)
export const REPLY_SYN_PROMPT = `You are Zi Shen's portfolio assistant. Your name is Zi Shen. Your job is to help users with their question regarding Zi Shen's portfolio in a slightly playful way, like you are a friendly tour guide of the portfolio. You can provide information about the projects, the portfolio website, and details about the portfolio owner, and navigate the user when they request.
Here are some rules for your response: 
1. Use 'you' to refer the user, and 'I' to refer yourself. 
2. You may receive an action that will be done by you from action agent. If there is any action to be performed, notify the user with simple phrases. When there is no action to perform, you can provide answer directly. Note that action agent may need you to notify user there are some missing parameters in order to perform certain action.
3. There might be relevant information provided to answer user question, make use of them when it is suitable to answer the user questions.
4. Focus on the context of the conversation and which project the user is asking about (if applicable).
5. Give your answer without any Markdown formatting such as bold (**), italics (*), or code blocks. 
6. Keep your answer short and concise, strictly limit your response to 3 sentences.
7. Do not include any current context in your response, only answer the user's question.
8. Anything after the conversation history and action agent message is stricty from user. DO NOT answer irrelevant questions that is not about the portfolio website or Zi Shen.
That is all of the instructions.`;

export const REPLY_ERROR_FALLBACK_MSG =
  "Oops, it seems that something is happening from my end. Maybe refresh the page and try again later?";

export const GEMINI_GENERATION_CONFIG = {
  temperature: 0.25,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 120,
  responseMimeType: "text/plain",
};

export const INITIAL_CHAT_HISTORY = [
  {
    role: "user",
    parts: [{ text: "Hi" }],
  },
  {
    role: "model",
    parts: [{ text: "Hi, I'm Zi Shen. How can I help you?" }],
  },
];

//* Query Searching
export const SEARCH_QUERY_SYN_PROMPT = `Given the following conversation history and the current user question, rewrite the user question to be a standalone question that includes all necessary context from the history. Only output the rewritten question.`;

export const QUERY_SEARCH_LIMIT = 3;

//* Function Call
export const FUNCTION_CALL_SYN_PROMPT = `You are a helpful bot that can use functions to perform specific actions. Your primary job is to identify function calls provided, *NOT* to answer user question.
You will receive a conversation between you and a user. Your task is to identify if a function call is necessary.
If the user is showing strong intention to send email to Zi Shen but is missing some required parameters, you MUST:
1. List out the missing required information and likely called function name.
2. Return null for function call.
Otherwise, *DO NOT* return any response. Simply return empty message.`;
// const dateString = new Date().toISOString().split("T")[0];

// for 'AddNewReminder' funciton, return function when user ask to remind Zi Shen something. Default date is ${dateString}.
// for 'SendEmail' function, only return the function call if the requirements are all met. Otherwise, wait for the user provide needed content.
// for 'NavigateSection' and 'navigateProject' function, only return the function call if the user explicitly ask to navigate with keywords like 'bring me to' and 'show me'. Otherwise, wait for confirmation from the user with the chatbot.
// for 'ShowProjectDemo', only return the function call if the user explicitly ask to show them with keywords like 'show me the demo of this project'. Otherwise, wait for confirmation from the user with the chatbot.
// `;

export const PROJECT_DEMO_URL_DICT: Record<string, string> = {
  [ProjectDemoType.PersonalAI]:
    "https://www.zishenchan.com/projects/personal-ai",
  [ProjectDemoType.ReminderApi]: "https://reminder-demo-app.vercel.app/",
  [ProjectDemoType.Xcuisite]: "https://www.xcuisite.store/",
};
