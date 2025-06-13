"use client";

import { ProjectVideo } from "./ProjectVideo";
import { useEffect, useState } from "react";
import { cn } from "@/app/utils/cn";

export function VideoWrapper({
  height = "300px",
  width,
  src,
}: {
  height?: string;
  width?: string;
  src: string;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const component = isClient ? (
    <ProjectVideo src={src} height={height} />
  ) : (
    <div
      className={cn(
        `w-full lg:w-[${width}] h-auto lg:h-[${height}] bg-gray-800 animate-pulse`
      )}
    />
  );

  return component;
}
