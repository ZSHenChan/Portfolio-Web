"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export function ChatbotInput({
  onSubmit,
  isSubmitting,
  isFocus,
  setIsFocus,
}: {
  onSubmit: (inputText: string) => void;
  isSubmitting: boolean;
  isFocus: boolean;
  setIsFocus: (focus: boolean) => void;
}) {
  const placeholders = [
    "Tell me about yourself.",
    "How can I contact you?",
    "What are the skills you have?",
    "What are the projects you have worked on?",
    "Can you show me your projects?",
  ];
  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      isFocus={isFocus}
      setIsFocus={setIsFocus}
    />
  );
}
