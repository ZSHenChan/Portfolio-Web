"use client";
import React, { useRef, useEffect } from "react";
import { Modal, ModalBody, ModalTrigger } from "./Animated-Modal";
import { ModalContent } from "./ModalContent";
import { ModalFooter } from "./ModalFooter";

export function AnimatedModal() {
  const listEndRef = useRef<null | HTMLDivElement>(null);

  // * testing use
  // useEffect(() => {
  //   const handle = async () => {
  //     getFunctionCalls({
  //       query: "navigate to section projects",
  //     });
  //   };
  //   handle();
  // }, []);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (listEndRef.current) {
        listEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
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
          <ModalContent />
          <ModalFooter />
        </ModalBody>
      </Modal>
    </div>
  );
}
