"use client";
import ReactPlayer from "react-player/lazy";
import { cn } from "@/app/utils/cn";

export function ProjectVideo({
  src,
  height,
  playing = true,
}: {
  src: string;
  height?: string;
  playing?: boolean;
}) {
  return (
    <div
      className={cn(
        `h-auto w-full lg:h-[${height}] relative overflow-hidden rounded-[12px]`
      )}
    >
      <ReactPlayer
        url={src}
        playing={playing}
        loop={true}
        muted={true}
        playsinline={true}
        width="100%"
        height="100%"
        controls={false}
      />
    </div>
  );
}
