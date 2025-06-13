"use client";

import { ReactNode } from "react";
import { Compare } from "@/components/ui/Compare";
import { ProjectTextBox } from "@/components/Projects/ProjectTextBox";
import { ProjectGrid } from "@/components/Projects/ProjectGrid";

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
    <ProjectGrid className={className} multipleCol={multipleCol}>
      <Compare
        firstImage={firstImage}
        secondImage={secondImage}
        firstImageClassName="object-cover"
        secondImageClassname="object-cover"
        className="h-[250px] w-full md:max-w-[600px]"
        slideMode={slideMode}
      />

      <ProjectTextBox>{children}</ProjectTextBox>
    </ProjectGrid>
  );
}
