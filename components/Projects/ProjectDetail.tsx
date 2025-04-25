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
  width = 600,
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
  return (
    <div
      className={`grid grid-cols-1 gap-4 text-start mb-8 ${className} ${
        multipleCol ? "lg:grid-cols-[5fr_3fr] gap-x-8 gap-y-8" : ""
      }`}
    >
      {videoSrc && <VideoWrapper src={videoSrc} height={height} />}
      {imgSrc && (
        <Image
          src={imgSrc}
          height={300}
          width={width}
          alt={alt || "Default image placeholder"}
          loading="lazy"
        />
      )}
      <div className="h-full place-content-center text-center">{children}</div>
    </div>
  );
}
