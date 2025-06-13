"use client";

import { ReactNode } from "react";
import { CodeBlock } from "../ui/code-block";
import { ProjectTextBox } from "../Projects/ProjectTextBox";
import { ProjectGrid } from "../Projects/ProjectGrid";

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
    <ProjectGrid multipleCol={multipleCol} className={className}>
      <CodeBlock
        language={language}
        filename={filename}
        code={code}
        highlightLines={highlightLines}
      />
      <ProjectTextBox>{children}</ProjectTextBox>
    </ProjectGrid>
  );
}
