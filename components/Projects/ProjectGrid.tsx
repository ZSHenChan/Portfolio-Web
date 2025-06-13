import { ReactNode } from "react";
import { cn } from "@/app/utils/cn";

export const ProjectGrid = ({
  children,
  className,
  multipleCol = false,
}: {
  children: ReactNode;
  className?: string;
  multipleCol?: boolean;
}) => {
  return (
    <div
      className={cn(
        `w-full grid grid-cols-1 gap-4 mb-16`,
        multipleCol && "lg:grid-cols-[5fr_3fr] gap-x-8 gap-y-8 sm:text-start",
        className
      )}
    >
      {children}
    </div>
  );
};
