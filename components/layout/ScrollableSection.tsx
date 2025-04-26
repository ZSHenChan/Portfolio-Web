import React from "react";

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
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
};
