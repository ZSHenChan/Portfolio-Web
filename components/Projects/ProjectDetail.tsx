"use client";

import { ReactNode } from "react";
import { VideoWrapper } from "./VideoWrapper";
import { useMediaQuery } from "react-responsive";

export function ProjectDetail({
  videoSrc,
  multipleCol = false,
  children,
  height = "300px",
}: {
  videoSrc: string;
  multipleCol?: boolean;
  children: ReactNode;
  height?: string;
}) {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const heightLg = height;
  const heightMd = "200px";

  return (
    <div
      className={`grid grid-cols-1 gap-4 text-start mb-8 ${
        multipleCol ? "lg:grid-cols-2 gap-x-8 gap-y-8" : ""
      }`}
    >
      <VideoWrapper
        src={videoSrc}
        height={isLargeScreen ? heightMd : heightLg}
      />
      <div className="h-full place-content-center text-center">{children}</div>
    </div>
  );
}
