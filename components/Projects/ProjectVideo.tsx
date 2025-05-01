"use client";
import ReactPlayer from "react-player/lazy";

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
    <div className="relative overflow-hidden rounded-[12px]">
      <ReactPlayer
        url={src}
        playing={playing}
        loop={true}
        muted={true}
        playsinline={true}
        width="100%"
        height={height || "300px"}
        controls={false}
      />
    </div>
  );
}
