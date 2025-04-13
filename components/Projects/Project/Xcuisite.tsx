"use client";
import { ProjectHeading } from "../ProjectHeading";
import { ProjectVideo } from "../ProjectVideo";
import React, { useState, useEffect } from "react";
import { ProjectText } from "../ProjectText";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { useMediaQuery } from "react-responsive";

export function XcuisiteProject() {
  const [isClient, setIsClient] = useState(false);
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  useEffect(() => {
    setIsClient(true);
  }, []);

  const heightLg = "300px";
  const heightMd = "200px";

  return (
    <div className="text-center">
      <ProjectHeading>XCuisite Ecommerce Website</ProjectHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 ">
        {isClient ? (
          <ProjectVideo
            src="/videos/video-xcuisite-1.mp4"
            height={isLargeScreen ? heightLg : heightMd}
          />
        ) : (
          <div className="w-full h-[200px] lg:h-[300px] bg-gray-800 animate-pulse" />
        )}
        <div className="h-full place-content-center ">
          <LinkPreview
            className="text-xl lg:text-3xl font-bold"
            url="https://xcuisite.store"
          >
            Link
          </LinkPreview>
        </div>
        {isClient ? (
          <ProjectVideo
            src="/videos/video-xcuisite-2.mp4"
            height={isLargeScreen ? heightLg : heightMd}
          />
        ) : (
          <div className="w-full h-[200px] lg:h-[300px] bg-gray-800 animate-pulse" />
        )}
        <div className="h-full place-content-center ">
          <ProjectText>Effective Cart System With Animations</ProjectText>
        </div>
        {isClient ? (
          <ProjectVideo
            src="/videos/video-xcuisite-3.mp4"
            height={isLargeScreen ? heightLg : heightMd}
          />
        ) : (
          <div className="w-full h-[200px] lg:h-[300px] bg-gray-800 animate-pulse" />
        )}
        <div className="h-full place-content-center ">
          <ProjectText>
            Authentication and Payment Gateway Integration
          </ProjectText>
        </div>
      </div>
    </div>
  );
}
