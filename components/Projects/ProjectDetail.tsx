"use client";

import { ReactNode } from "react";
import { VideoWrapper } from "./VideoWrapper";
import Image from "next/image";

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
    <div
      className={`grid grid-cols-1 gap-4 text-start mb-8 ${className} ${
        multipleCol ? "lg:grid-cols-[5fr_3fr] gap-x-8 gap-y-8" : ""
      }`}
    >
      {videoSrc && (
        <VideoWrapper src={videoSrc} height={height} width={`${width}px`} />
      )}
      {imgSrc && (
        <Image
          src={imgSrc}
          height={imgHeght}
          width={width}
          alt={alt || "Default image placeholder"}
          loading="lazy"
        />
      )}
      <div className="h-full place-content-center text-center">{children}</div>
    </div>
  );
}
