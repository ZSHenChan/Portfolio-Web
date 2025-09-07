"use client";
import { cn } from "@/app/utils/cn";
import React, { useState } from "react";
import { ChatInstance } from "./demoChatHistory";
import { motion } from "motion/react";
import { fetchChatbotReply, Reply } from "@/app/lib/chatbot/fetchReply";
import { executeFunctionCall } from "@/app/lib/chatbot/functionHandlers";
import { v4 as uuidv4 } from "uuid";
import { useModal } from "./Animated-Modal";
import { ChatbotInput } from "./ChatbotInput";
import { useAppActions } from "@/app/context/AppActionsContext";
import { useUIState } from "@/app/context/UIStateContext";

const AnimationToggleButton = ({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toggleSwitch = () =>
    setIsOn((prev) => {
      return !prev;
    });

  return (
    <div className="flex flex-col items-center justify-center ">
      <motion.button
        className={`w-[40px] h-[20px] rounded-[25px] flex p-[2px] cursor-pointer`}
        style={{
          justifyContent: "flex-" + (isOn ? "end" : "start"),
        }}
        onClick={toggleSwitch}
        animate={{
          backgroundColor: isOn ? "#1f2937" : "#e2e8f0",
        }}
      >
        <motion.div
          className="w-[16px] h-full bg-white/80 rounded-[25px]"
          layout
          transition={{
            type: "spring",
            visualDuration: 0.3,
            bounce: 0.2,
          }}
          animate={{
            backgroundColor: isOn ? "#e2e8f0" : "#1f2937",
          }}
        />
      </motion.button>
      <p className="text-xs text-slate-300">Animation</p>
    </div>
  );
};

export const ModalFooter = () => {
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const { setChatHistory, chatHistory } = useModal();
  const appActions = useAppActions();
  const uiState = useUIState();

  const generateRandomId = () => {
    return uuidv4().slice(0, 8);
  };

  const handleSubmit = async (textInput: string) => {
    const updatedChatHistory = [
      ...chatHistory,
      {
        id: generateRandomId(),
        message: textInput,
        isBot: false,
      } as ChatInstance,
    ];
    setChatHistory(updatedChatHistory);

    setIsThinking(true);
    const botId = generateRandomId();
    setTimeout(
      () =>
        setChatHistory((chatHistory: ChatInstance[]) => [
          ...chatHistory,
          { id: botId, message: "...", isBot: true },
        ]),
      500
    );

    const reply = (await fetchChatbotReply({
      chatHistory: updatedChatHistory.slice(-20),
    })) as Reply;
    setIsThinking(false);
    setChatHistory((prev) =>
      prev
        .filter((chat) => chat.id !== botId)
        .concat({
          id: generateRandomId(),
          message: reply.message,
          isBot: true,
        })
    );
    setTimeout(
      () => executeFunctionCall(reply.functionCall, appActions, uiState),
      500
    );
  };

  return (
    <div
      className={cn("flex justify-between p-4 backdrop-blur-md bg-slate-50/20")}
    >
      <div className="flex items-center gap-10">
        <AnimationToggleButton
          isOn={activeAnimation}
          setIsOn={setActiveAnimation}
        />
        <span className="text-xs md:text-sm hidden md:block">
          Double check information as LLM may make mistakes.
        </span>
      </div>
      <ChatbotInput
        onSubmit={handleSubmit}
        isSubmitting={isThinking}
        activeAnimation={activeAnimation}
      />
    </div>
  );
};
