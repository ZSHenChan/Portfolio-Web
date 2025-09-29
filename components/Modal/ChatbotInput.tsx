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
    "Tell me about yourself",
    "How can I contact you?",
    "What are the skills you have?",
    "Show me your recent projects",
    "What are your personal experiences?",
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
