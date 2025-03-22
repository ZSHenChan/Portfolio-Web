"use client";
import ReactPlayer from "react-player/lazy";
import { Suspense } from "react";

export function ProjectVideo({ src }: { src: string }) {
  return (
    <div className="relative overflow-hidden rounded-[12px]">
      <Suspense
        fallback={
          <div className="w-full h-[200px] bg-gray-200 animate-pulse" />
        }
      >
        <ReactPlayer
          url={src}
          playing={true}
          loop={true}
          muted={true}
          playsinline={true}
          width="100%"
          height="200px"
          controls={false}
        />
      </Suspense>
    </div>
  );
}
