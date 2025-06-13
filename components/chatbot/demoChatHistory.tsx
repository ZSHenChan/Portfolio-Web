export interface ChatInstance {
  id: string;
  message: string;
  isBot: boolean;
}

export const CHAT_HISTORY: ChatInstance[] = [
  {
    id: "0",
    message:
      "[Note from Zi Shen: the first reply may take longer than usual due to cold start on server. Have fun with my AI!]",
    isBot: true,
  },
  {
    id: "1",
    message:
      "[Email sending service is currently down due to emailJS maintenance]",
    isBot: true,
  },
  {
    id: "2",
    message: "Hey there, I am Zi Shen. How can I help you?",
    isBot: true,
  },
];

export const DEMO_CHAT_HISTORY: ChatInstance[] = [
  {
    id: "1",
    message: "Hello, I am a Chatbot. How can I help you?",
    isBot: true,
  },
  {
    id: "2",
    message: "I am looking for a place to stay in Paris.",
    isBot: false,
  },
  {
    id: "3",
    message:
      "Sure, I can help you with that. How many days are you planning to stay?",
    isBot: true,
  },
  {
    id: "4",
    message: "I will be staying for 5 days.",
    isBot: false,
  },
  {
    id: "5",
    message: "Great! I have found some hotels for you. Please have a look.",
    isBot: true,
  },
  {
    id: "6",
    message: "Thank you!",
    isBot: false,
  },
  {
    id: "7",
    message: "You're welcome!",
    isBot: true,
  },
  {
    id: "8",
    message: "Goodbye!",
    isBot: false,
  },
  {
    id: "9",
    message: "Goodbye!",
    isBot: true,
  },
  {
    id: "10",
    message: "Goodbye!",
    isBot: false,
  },
  {
    id: "11",
    message: "Goodbye!",
    isBot: true,
  },
];
