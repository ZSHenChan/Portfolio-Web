export interface ChatInstance {
  id: string;
  message: string;
  role: string;
}

export const CHAT_HISTORY: ChatInstance[] = [
  {
    id: "0",
    message: "[Double check information as LLM may make mistakes]",
    role: "bot",
  },
  {
    id: "1",
    message:
      "[Disable function calling to prevent navigations performed by my assistant]",
    role: "bot",
  },
  {
    id: "2",
    message: "Hey there, I am Zi Shen. How can I help you?",
    role: "bot",
  },
];
