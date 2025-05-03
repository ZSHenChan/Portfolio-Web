"use client";

import { ReactNode } from "react";
import { Compare } from "@/components/ui/Compare";

export function CompareDetail({
  firstImage,
  secondImage,
  children,
  multipleCol = false,
  slideMode = "drag",
  className,
}: {
  firstImage?: string;
  secondImage?: string;
  children?: ReactNode;
  multipleCol?: boolean;
  slideMode?: "hover" | "drag" | undefined;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 text-start mb-8 ${className} ${
        multipleCol ? "lg:grid-cols-[5fr_3fr] gap-x-8 gap-y-8" : ""
      }`}
    >
      <Compare
        firstImage={firstImage}
        secondImage={secondImage}
        firstImageClassName="object-cover"
        secondImageClassname="object-cover"
        className="h-[250px] w-full md:max-w-[600px]"
        slideMode={slideMode}
      />

      <div className="h-full place-content-center text-center">{children}</div>
    </div>
  );
}
