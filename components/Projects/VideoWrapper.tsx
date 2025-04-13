"use client";

import { ProjectVideo } from "./ProjectVideo";
import { useEffect, useState } from "react";

export function VideoWrapper({
  height = "300px",
  src,
}: {
  height?: string;
  src: string;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const component = isClient ? (
    <ProjectVideo src={src} height={height} />
  ) : (
    <div className={`w-full h-[${height}] bg-gray-800 animate-pulse`} />
  );

  return component;
}
