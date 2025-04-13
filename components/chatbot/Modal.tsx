"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./Animated-Modal";
import { ChatInstance, CHAT_HISTORY } from "./demoChatHistory";
import { motion, LayoutGroup } from "motion/react";
import { fetchChatbotReply, Reply } from "@/app/lib/chatbot/getReply";
import { executeFunctionCall } from "@/app/lib/chatbot/executeFunctionCall";
import { v4 as uuidv4 } from "uuid";
import { getFunctionCalls } from "@/app/lib/chatbot/getFunctionCalls";
import { useRefs } from "@/app/context/RefsContext";

export function AnimatedModal() {
  const [chatHistory, setChatHistory] = useState<ChatInstance[]>(CHAT_HISTORY);
  const [isThinking, setIsThinking] = useState(false);
  const listRef = useRef<null | HTMLUListElement>(null);
  const listEndRef = useRef<null | HTMLDivElement>(null);
  const { scrollToSection } = useRefs();

  // * testing use
  useEffect(() => {
    const handle = async () => {
      getFunctionCalls({
        query: "navigate to section projects",
      });
    };
    // handle();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (listEndRef.current) {
        listEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Adjust delay (milliseconds) as needed
  };

  const handleSubmit = async (textInput: string) => {
    setChatHistory((prev) => [
      ...prev,
      { id: uuidv4(), message: textInput, isBot: false },
    ]);
    setIsThinking(true);
    const botId = uuidv4();
    setTimeout(
      () =>
        setChatHistory((prev) => [
          ...prev,
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
      () => executeFunctionCall(reply.functionCall, scrollToSection),
      500
    );
  };

  const itemVariants = {
    initial: { y: 100 },
    animate: { y: 0, transition: { duration: 0.5, type: "spring" } },
  };

  return (
    <div className="w-screen flex items-center justify-center">
      <Modal>
        <ModalTrigger
          onOpen={scrollToBottom}
          className="fixed bottom-[30px] right-[30px] z-5 cursor-pointer"
        >
          <span className="text-center">Start a Chat</span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent className="h-full overflow-y-scroll">
            <ul
              ref={listRef}
              className="w-full pb-2 flex flex-col items-stretch"
            >
              <LayoutGroup>
                {chatHistory.map((chat: ChatInstance) => (
                  <motion.li
                    key={chat.id}
                    variants={itemVariants}
                    initial="initial"
                    animate="animate"
                    className={`py-[0.5rem] px-8 rounded-[4rem] text-start justify-center mt-6 max-w-5/6 ${
                      chat.isBot
                        ? "bg-indigo-200/60  self-start rounded-[10px] rounded-tl-[2px]"
                        : "bg-slate-700/40 self-end rounded-[10px] rounded-tr-[2px]"
                    }`}
                  >
                    <span
                      className={`${
                        chat.isBot ? "text-neutral-800" : "text-neutral-300"
                      } text-sm text-start`}
                    >
                      {chat.message}
                    </span>
                  </motion.li>
                ))}
                <div ref={listEndRef}></div>
              </LayoutGroup>
            </ul>
          </ModalContent>
          <ModalFooter
            onSubmit={handleSubmit}
            isSubmitting={isThinking}
            className="gap-4"
          ></ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
