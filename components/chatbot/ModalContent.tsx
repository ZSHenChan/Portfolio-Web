"use client";
import React, { useRef, useEffect } from "react";
import { ChatInstance } from "./demoChatHistory";
import { motion, LayoutGroup } from "motion/react";
import { useModal } from "./Animated-Modal";
import { cn } from "@/app/utils/cn";

const itemVariants = {
  initial: { y: 100 },
  animate: { y: 0, transition: { duration: 0.5, type: "spring" } },
};

export function ModalContent() {
  const { chatHistory } = useModal();
  const listEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (listEndRef.current) {
        listEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div
      className={cn(
        "flex flex-col-reverse flex-1 px-4 pb-4 h-full overflow-y-scroll"
      )}
    >
      <ul className="w-full pb-2 flex flex-col items-stretch">
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
    </div>
  );
}
