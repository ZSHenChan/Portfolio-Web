"use client";

import { ProjectVideo } from "./ProjectVideo";
import { useEffect, useState } from "react";

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
      className={`w-full bg-gray-800 animate-pulse`}
      style={{ height, width }}
    />
  );

  return component;
}
