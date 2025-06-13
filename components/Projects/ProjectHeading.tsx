import { ReactNode } from "react";

export function ProjectHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`text-zinc-300 text-center text-xl md:text-3xl font-bold mb-8 ${className}`}
    >
      {children}
    </h3>
  );
}
