"use client";

import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";

export function ChatbotInput({
  onSubmit,
  isSubmitting,
  activeAnimation,
}: {
  onSubmit: (inputText: string) => void;
  isSubmitting: boolean;
  activeAnimation: boolean;
}) {
  const placeholders = [
    "Tell me about XCuisite website.",
    "How can I contact you?",
    "What are the skills you have?",
    "What are the projects you have worked on?",
    "What are the technologies you have worked with?",
  ];
  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      activeAnimation={activeAnimation}
    />
  );
}
