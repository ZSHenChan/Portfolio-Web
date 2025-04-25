import { useState, useCallback } from "react";

export interface Conversation {
  role: string;
  content: string;
}

const useConversation = () => {
  const [history, setHistory] = useState([] as Conversation[]);

  const addMessage = useCallback(
    (newChats: Conversation[]) => {
      setHistory((prevHistory: Conversation[]) => {
        const updatedHistory = [...prevHistory, ...newChats];
        if (updatedHistory.length > 10) {
          return updatedHistory.slice(newChats.length);
        }
        return updatedHistory;
      });
    },
    [setHistory]
  );

  return { history, addMessage };
};

export default useConversation;
