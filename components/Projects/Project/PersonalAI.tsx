"use client";
import { ProjectHeading } from "../ProjectHeading";
import { ProjectVideo } from "../ProjectVideo";
import React, { useState, useEffect } from "react";
import { ProjectText } from "../ProjectText";

function PersonalAIProject() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <ProjectHeading>Personal AI Assistant</ProjectHeading>
      <div className="grid grid-cols-1 gap-4 text-start">
        {isClient ? (
          <ProjectVideo
            src="/videos/video-portfolio-short.mp4"
            height="400px"
          />
        ) : (
          <div className="w-full h-[400px] bg-gray-800 animate-pulse" />
        )}
        <div className="h-full place-content-center text-center">
          <ProjectText>
            Fine-tuned AI to handle questions regarding my portfolio website.
          </ProjectText>
          <ProjectText>This is just one of my trained AI!</ProjectText>
        </div>
      </div>
    </div>
  );
}

export { PersonalAIProject };
