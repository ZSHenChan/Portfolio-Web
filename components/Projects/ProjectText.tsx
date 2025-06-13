import { ReactNode } from "react";
import { cn } from "@/app/utils/cn";

export function ProjectText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-neutral-200 text-sm lg:text-lg mb-4", className)}>
      {children}
    </p>
  );
}
