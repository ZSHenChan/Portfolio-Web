export interface ChatInstance {
  id: string;
  message: string;
  role: string;
}

export const CHAT_HISTORY: ChatInstance[] = [
  {
    id: "0",
    message: "Hey there, I am Zi Shen. How can I help you?",
    role: "bot",
  },
];
