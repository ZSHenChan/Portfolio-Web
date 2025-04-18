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
      <div className="grid grid-cols-1 gap-4 text-start mb-8">
        {isClient ? (
          <ProjectVideo
            src="/videos/video-portfolio-short.mp4"
            height="300px"
          />
        ) : (
          <div className="w-full h-[300px] bg-gray-800 animate-pulse" />
        )}
        <div className="h-full place-content-center text-center">
          <ProjectText>
            Fine-tuned AI to handle questions regarding my portfolio website.
          </ProjectText>
          <ProjectText>This is just one of my trained AI!</ProjectText>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 text-start mb-8">
        {isClient ? (
          <ProjectVideo
            src="/videos/video-portfolio-email.mp4"
            height="300px"
          />
        ) : (
          <div className="w-full h-[300px] bg-gray-800 animate-pulse" />
        )}
        <div className="h-full place-content-center text-center">
          <ProjectText>Ask my AI to email for you!</ProjectText>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 text-start">
        {isClient ? (
          <ProjectVideo
            src="/videos/video-portfolio-scroll.mp4"
            height="300px"
          />
        ) : (
          <div className="w-full h-[300px] bg-gray-800 animate-pulse" />
        )}
        <div className="h-full place-content-center text-center">
          <ProjectText>Navigation for visitors</ProjectText>
        </div>
      </div>
    </div>
  );
}

export { PersonalAIProject };
