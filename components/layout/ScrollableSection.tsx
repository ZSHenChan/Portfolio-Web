import React from "react";
import { useScrollTargetRegistration } from "@/app/context/UIStateContext";

interface ScrollableSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const ScrollableSection = ({
  id,
  children,
  className,
}: ScrollableSectionProps) => {
  useScrollTargetRegistration(id);

  return (
    <section id={id} className={`mb-[10dvh] lg:mb-[25dvh] w-full ${className}`}>
      {children}
    </section>
  );
};
