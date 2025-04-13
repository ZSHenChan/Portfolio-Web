"use client";
import { ProjectHeading } from "../ProjectHeading";
import { ProjectVideo } from "../ProjectVideo";
import React, { useState, useEffect } from "react";
import { ProjectText } from "../ProjectText";

export function AutomtionManagerProject() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <ProjectHeading>Automation Manager</ProjectHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-start">
        {isClient ? (
          <ProjectVideo
            src="/videos/video-portfolio-short.mp4"
            playing={false}
          />
        ) : (
          <div className="w-full h-[200px] bg-gray-800 animate-pulse" />
        )}
        <div className="h-full place-content-center pr-[25%]">
          <ProjectText>
            Automated 5G signal testing powered by .NET gRPC and Consul
          </ProjectText>
          <ProjectText>Demo video coming soon!</ProjectText>
        </div>
      </div>
    </div>
  );
}
