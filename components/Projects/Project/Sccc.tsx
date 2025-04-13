"use client";
import { ProjectHeading } from "../ProjectHeading";
import { ProjectVideo } from "../ProjectVideo";
import React, { useState, useEffect } from "react";
import { ProjectText } from "../ProjectText";

export function ScccProject() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <ProjectHeading>SCCC Articulatory Accent Database</ProjectHeading>
      <div className="grid grid-cols-1 gap-4 text-center">
        {isClient ? (
          <ProjectVideo src="/videos/video-sccc.mp4" height="300px" />
        ) : (
          <div className="w-full h-[200px] bg-gray-800 animate-pulse" />
        )}
        <div className="h-full place-content-center">
          <ProjectText>Collection of Recorded Audios</ProjectText>
        </div>
      </div>
    </div>
  );
}
