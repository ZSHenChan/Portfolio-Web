"use client";
import { ProjectHeading } from "../ProjectHeading";
import { ProjectVideo } from "../ProjectVideo";
import React, { useState, useEffect } from "react";
import { ProjectText } from "../ProjectText";
import { useMediaQuery } from "react-responsive";

export function AutomtionManagerProject() {
  const [isClient, setIsClient] = useState(false);
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" }); // lg breakpoint
  useEffect(() => {
    setIsClient(true);
  }, []);

  const heightLg = "300px";
  const heightMd = "200px";

  return (
    <div>
      <ProjectHeading>Automation Manager</ProjectHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-center lg:text-start">
        {isClient ? (
          <ProjectVideo
            src="/videos/video-portfolio-short.mp4"
            height={isLargeScreen ? heightLg : heightMd}
            playing={false}
          />
        ) : (
          <div className="w-full h-[200px] lg:h-[300px] bg-gray-800 animate-pulse" />
        )}
        <div className="h-full place-content-center lg:pr-[25%]">
          <ProjectText>
            Automated 5G signal testing powered by .NET gRPC and Consul
          </ProjectText>
          <ProjectText>Demo video coming soon!</ProjectText>
        </div>
      </div>
    </div>
  );
}
