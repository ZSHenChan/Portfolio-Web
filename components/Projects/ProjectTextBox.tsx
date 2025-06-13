import React, { ReactNode } from "react";
import { cn } from "@/app/utils/cn";

export const ProjectTextBox = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(`h-full place-content-center px-[2rem] lg:px-0`, className)}
    >
      {children}
    </div>
  );
};
