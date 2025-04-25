import { ChatInstance } from "@/components/chatbot/demoChatHistory";
import { Conversation } from "@/app/hooks/useConversation";

export const chatToConversation = (chat: ChatInstance) => {
  const conversation = {
    role: chat.isBot ? "bot" : "user",
    content: chat.message,
  } as Conversation;
  return conversation;
};
