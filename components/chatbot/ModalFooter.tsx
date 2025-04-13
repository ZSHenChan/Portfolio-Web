"use client";
import { cn } from "@/app/utils/cn";
import { env } from "@/app/env/client";
import React, { useState } from "react";
import { ChatInstance } from "./demoChatHistory";
import { motion } from "motion/react";
import { fetchChatbotReply, Reply } from "@/app/lib/chatbot/getReply";
import { executeFunctionCall } from "@/app/lib/chatbot/executeFunctionCall";
import { v4 as uuidv4 } from "uuid";
import { useModal } from "./Animated-Modal";
import { useRefs } from "@/app/context/RefsContext";
import { ChatbotInput } from "./ChatbotInput";

const AnimationToggleButton = ({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toggleSwitch = () =>
    setIsOn((prev) => {
      // console.log(!prev);
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
  const [activeAnimation, setActiveAnimation] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const { setChatHistory, setOpen } = useModal();
  const { scrollToSection } = useRefs();

  const handleSubmit = async (textInput: string) => {
    setChatHistory((chatHistory: ChatInstance[]) => [
      ...chatHistory,
      { id: uuidv4(), message: textInput, isBot: false } as ChatInstance,
    ]);
    setIsThinking(true);
    const botId = uuidv4();
    setTimeout(
      () =>
        setChatHistory((chatHistory: ChatInstance[]) => [
          ...chatHistory,
          { id: botId, message: "Thinking...", isBot: true },
        ]),
      500
    );

    const reply = (await fetchChatbotReply({
      query: textInput,
    })) as Reply;
    setIsThinking(false);
    setChatHistory((prev) =>
      prev
        .filter((chat) => chat.id !== botId)
        .concat({
          id: uuidv4(),
          message: reply.message,
          isBot: true,
        })
    );
    setTimeout(
      () => executeFunctionCall(reply.functionCall, scrollToSection, setOpen),
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
          {env.NEXT_PUBLIC_GEMINI_MODEL_NAME}
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
