"use client";
import { cn } from "@/app/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import React, {
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { HoverBorderGradient } from "./HoverBorderGradient";
import { ChatInstance, CHAT_HISTORY } from "./demoChatHistory";
import { useUIState } from "@/app/context/UIStateContext";

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

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
  children,
  className,
  onOpen,
}: {
  children: ReactNode;
  className?: string;
  onOpen: () => void;
}) => {
  const { setChatOpen } = useUIState();
  return (
    <div
      className={className}
      onClick={() => {
        setChatOpen(true);
        setTimeout(() => onOpen(), 100);
      }}
    >
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="bg-black/90 text-slate-100 flex items-center px-8 cursor-pointer"
      >
        {children}
      </HoverBorderGradient>
    </div>
  );
};

const modalBgVariants = {
  initial: { opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    backdropFilter: "blur(10px)",
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { delay: 1 },
  },
};

const modalVariants = {
  initial: {
    height: 0,
  },
  animate: {
    height: "70%",
    transition: { delay: 0.5 },
  },
  exit: {
    height: 0,
    transition: { delay: 0.5 },
  },
  transition: {
    type: "spring",
    stiffness: 900,
    damping: 80,
  },
};

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isChatOpen, allowAnimation } = useUIState();

  const modalRef = useRef<HTMLDivElement>(null);
  const { setChatOpen } = useUIState();
  useOutsideClick(modalRef, () => setChatOpen(false));

  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          variants={modalBgVariants}
          initial="initial"
          animate="animate"
          exit={allowAnimation ? "exit" : "initial"}
          className="w-screen fixed inset-0 flex items-center justify-center z-50"
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              "h-[70%] max-w-[90%] lg:max-w-[70%] bg-slate-800/55 backdrop-blur-md overflow-hidden border border-slate-50/20 md:rounded-2xl relative z-50 flex flex-col flex-1",
              className
            )}
            variants={allowAnimation ? modalVariants : undefined}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      className={`fixed inset-0 h-full w-full bg-black/50 z-50 ${className}`}
    ></motion.div>
  );
};

const iconVariants = {
  hidden: { y: -10, opacity: 0, duration: 0.5 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1.1,
      duration: 0.5,
      type: "spring",
    },
  },
};

const CloseIcon = () => {
  const { isChatOpen, setChatOpen, allowAnimation } = useUIState();
  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.button
          variants={allowAnimation ? iconVariants : undefined}
          initial="hidden"
          animate={isChatOpen ? "visible" : "hidden"}
          exit="hidden"
          onClick={() => setChatOpen(false)}
          className="absolute top-4 right-4 group cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black dark:text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
