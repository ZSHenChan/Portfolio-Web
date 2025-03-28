"use client";
import { cn } from "@/app/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { ChatbotInput } from "./ChatbotInput";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { HoverBorderGradient } from "./HoverBorderGradient";
import { env } from "@/app/env/client";

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
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
  const { setOpen } = useModal();
  return (
    <div
      className={className}
      onClick={() => {
        setOpen(true);
        setTimeout(() => onOpen(), 100);
      }}
    >
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-slate-100 text-black dark:text-slate-100 flex items-center px-8 cursor-pointer"
      >
        {children}
      </HoverBorderGradient>
    </div>
  );
};

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { open } = useModal();

  // useEffect(() => {
  //   if (open) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [open]);

  const modalRef = useRef<HTMLDivElement>(null);
  const { setOpen } = useModal();
  useOutsideClick(modalRef, () => setOpen(false));

  return (
    <AnimatePresence>
      {open && (
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
          className="w-screen fixed [perspective:800px] [transform-style:preserve-3d] inset-0 flex items-center justify-center z-50"
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              "h-[70%] md:max-w-[70%] bg-slate-800/55 backdrop-blur-md overflow-hidden border border-slate-50/20 md:rounded-2xl relative z-50 flex flex-col flex-1",
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("h-full flex flex-col-reverse flex-1 px-4 pb-4", className)}
    >
      {children}
    </div>
  );
};

export const ModalFooter = ({
  onSubmit,
  isSubmitting,
  className,
}: {
  onSubmit: (textInput: string) => void;
  isSubmitting: boolean;
  className?: string;
}) => {
  const [isOn, setIsOn] = useState(true);
  return (
    <div
      className={cn(
        "flex justify-between p-4 backdrop-blur-md bg-slate-50/20",
        className
      )}
    >
      <div className="flex items-center gap-10">
        <AnimationToggleButton isOn={isOn} setIsOn={setIsOn} />
        <span className="text-xs md:text-sm">
          model: {env.NEXT_PUBLIC_GEMINI_MODEL_NAME}
        </span>
      </div>
      <ChatbotInput
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        activeAnimation={isOn}
      />
    </div>
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

const CloseIcon = () => {
  const { setOpen } = useModal();
  return (
    <button
      onClick={() => setOpen(false)}
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
    </button>
  );
};

const AnimationToggleButton = ({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toggleSwitch = () =>
    setIsOn((prev) => {
      console.log(!prev);
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

// Hook to detect clicks outside of a component.
// Add it in a separate file, I've added here for simplicity
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function
) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (event: any) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
