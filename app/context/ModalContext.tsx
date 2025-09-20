import {
  ChatInstance,
  CHAT_HISTORY,
} from "@/components/chatbot/demoChatHistory";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface ModalContextType {
  chatHistory: ChatInstance[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatInstance[]>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [chatHistory, setChatHistory] = useState<ChatInstance[]>(CHAT_HISTORY);

  return (
    <ModalContext.Provider
      value={{
        chatHistory,
        setChatHistory,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
