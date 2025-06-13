"use client";

import { ReactNode } from "react";
import { VideoWrapper } from "./VideoWrapper";
import Image from "next/image";
import { ProjectTextBox } from "./ProjectTextBox";
import { ProjectGrid } from "./ProjectGrid";
import { cn } from "@/app/utils/cn";

export function ProjectDetail({
  videoSrc,
  imgSrc,
  alt,
  multipleCol = false,
  children,
  height = "300px",
  width = 400,
  className,
}: {
  videoSrc?: string;
  imgSrc?: string;
  alt?: string;
  multipleCol?: boolean;
  children?: ReactNode;
  height?: string;
  width?: number;
  className?: string;
}) {
  const imgHeght = parseInt(height.replace("px", ""));
  return (
    <ProjectGrid className={className} multipleCol={multipleCol}>
      {videoSrc && (
        <VideoWrapper src={videoSrc} height={height} width={`${width}px`} />
      )}
      {imgSrc && (
        <Image
          className="place-self-center rounded-2xl"
          src={imgSrc}
          height={imgHeght}
          width={width}
          alt={alt || "Default image placeholder"}
          loading="lazy"
        />
      )}
      <ProjectTextBox
        className={cn(multipleCol && "max-w-[70ch] lg:max-w-[50ch]")}
      >
        {children}
      </ProjectTextBox>
    </ProjectGrid>
  );
}
