"use client";
import ReactPlayer from "react-player/lazy";
import { Suspense } from "react";

export function ProjectVideo({
  src,
  className,
  height,
  playing = true,
}: {
  src: string;
  className?: string;
  height?: string;
  playing?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-[12px]">
      <Suspense
        fallback={
          <div
            className={`w-full h-[200px] h-[${height}] bg-gray-200 animate-pulse ${className}`}
          />
        }
      >
        <ReactPlayer
          url={src}
          playing={playing}
          loop={true}
          muted={true}
          playsinline={true}
          width="100%"
          height={height || "200px"}
          controls={false}
        />
      </Suspense>
    </div>
  );
}
