"use client";

import { ReactNode } from "react";
import { CodeBlock } from "../ui/code-block";

export function CodeDetail({
  language,
  filename,
  highlightLines,
  multipleCol = false,
  code,
  children,
  className,
}: {
  language: string;
  filename: string;
  highlightLines?: number[];
  multipleCol?: boolean;
  code: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full grid grid-cols-1 gap-4 text-start mb-8 ${className} ${
        multipleCol ? "lg:grid-cols-[5fr_3fr] gap-x-8 gap-y-8" : ""
      }`}
    >
      <CodeBlock
        language={language}
        filename={filename}
        code={code}
        highlightLines={highlightLines}
      />
      <div className="h-full place-content-center text-center">{children}</div>
    </div>
  );
}
