import { ReactNode } from "react";

export function ProjectText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-neutral-200 text-sm lg:text-lg font-normal mb-8 ${className}`}
    >
      {children}
    </p>
  );
}
