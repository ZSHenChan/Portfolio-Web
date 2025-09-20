"use client";
import { cn } from "@/app/utils/cn";
import { useState } from "react";
import { ChatInstance } from "./demoChatHistory";
import { motion, AnimatePresence } from "motion/react";
import { fetchChatbotReply, Reply } from "@/app/lib/chatbot/fetchReply";
import { executeFunctionCall } from "@/app/lib/chatbot/functionHandlers";
import { v4 as uuidv4 } from "uuid";
import { useModal } from "./Animated-Modal";
import { ChatbotInput } from "./ChatbotInput";
import { useAppActions } from "@/app/context/AppActionsContext";
import { useUIState } from "@/app/context/UIStateContext";
import {
  CHATBOT_WAITING_PLACEHOLDER,
  MAX_CHAT_HISTORY_INSTANCE,
} from "@/app/lib/chatbot/config";
import { AnimatedToggleButton } from "../Buttons/AnimatedToggleButton";

const AnimationToggleButton = () => {
  const { allowAnimation, setAllowAnimation } = useUIState();
  return (
    <AnimatedToggleButton
      text="Animation"
      isOn={allowAnimation}
      setIsOn={setAllowAnimation}
      ambient={false}
    />
  );
};

const FunctionCallToggleButton = ({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: (open: boolean) => void;
}) => {
  const { isChatOpen } = useUIState();

  return (
    <AnimatedToggleButton
      text="Function Call"
      isOn={isOn}
      setIsOn={setIsOn}
      ambient={isChatOpen}
      firstTimeDelay={2000}
    />
  );
};

const footerVariants = {
  hidden: { y: 50, opacity: 0, duration: 0.5 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.7,
      duration: 0.5,
      type: "spring",
    },
  },
};

export const ModalFooter = () => {
  const uiState = useUIState();
  const [enableFuncall, setEnableFuncall] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const { setChatHistory, chatHistory } = useModal();
  const appActions = useAppActions();

  const generateRandomId = () => {
    return uuidv4().slice(0, 8);
  };

  const handleSubmit = async (textInput: string) => {
    const updatedChatHistory = [
      ...chatHistory,
      {
        id: generateRandomId(),
        message: textInput,
        role: "user",
      } as ChatInstance,
    ];
    setChatHistory(updatedChatHistory);

    setIsThinking(true);
    const botId = generateRandomId();
    setTimeout(
      () =>
        setChatHistory((chatHistory: ChatInstance[]) => [
          ...chatHistory,
          { id: botId, message: CHATBOT_WAITING_PLACEHOLDER, role: "bot" },
        ]),
      500
    );

    const reply = (await fetchChatbotReply({
      chatHistory: updatedChatHistory.slice(-MAX_CHAT_HISTORY_INSTANCE),
      enableFunctionCalling: enableFuncall,
    })) as Reply;
    setIsThinking(false);
    setChatHistory((prev) =>
      prev
        .filter((chat) => chat.id !== botId)
        .concat([
          {
            id: generateRandomId(),
            message: reply.message,
            role: "bot",
          } as ChatInstance,
        ])
    );
    if (reply.functionCall != null) {
      setChatHistory((prev) =>
        prev.concat([
          {
            id: generateRandomId(),
            message: reply.funcSysMsg,
            role: "system",
          } as ChatInstance,
        ])
      );
    }
    setTimeout(
      () => executeFunctionCall(reply.functionCall, appActions, uiState),
      500
    );
  };

  return (
    <AnimatePresence>
      {uiState.isChatOpen && (
        <motion.div
          variants={uiState.allowAnimation ? footerVariants : undefined}
          initial="hidden"
          animate={uiState.isChatOpen ? "visible" : "hidden"}
          exit="hidden"
          className={cn(
            "flex justify-between p-4 backdrop-blur-md bg-slate-50/20"
          )}
        >
          <div className="flex items-center gap-4">
            <AnimationToggleButton />
            <FunctionCallToggleButton
              isOn={enableFuncall}
              setIsOn={setEnableFuncall}
            />
          </div>
          <ChatbotInput onSubmit={handleSubmit} isSubmitting={isThinking} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
