"use client";
import { SectionHeading } from "../Headings/SectionHeading";
import React, { ReactNode, useState, useEffect } from "react";
import { Timeline } from "@/components/ui/Timeline";
import { ProjectHeading } from "./ProjectHeading";
import { ProjectVideo } from "./ProjectVideo";
import { LinkPreview } from "@/components/Contact/LinkPreview";

export function SectionProjects() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const ProjectText = ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => {
    return (
      <p
        className={`text-neutral-200 tex-md md:text-lg font-normal mb-8 ${className}`}
      >
        {children}
      </p>
    );
  };

  const data = [
    {
      title: "2025",
      content: (
        <div className="grid grid-cols-1 gap-32">
          <div>
            <ProjectHeading>Personal AI Assistant</ProjectHeading>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-start">
              {isClient ? (
                <ProjectVideo src="/videos/video-portfolio-short.mp4" />
              ) : (
                <div className="w-full h-[200px] bg-gray-800 animate-pulse" />
              )}
              <div className="h-full place-content-center pr-[25%]">
                <ProjectText>
                  Fine-tuned AI to handle questions regarding my portfolio
                  website.
                </ProjectText>
                <ProjectText>This is just one of my trained AI!</ProjectText>
              </div>
            </div>
          </div>
          <div>
            <ProjectHeading>Automation Manager</ProjectHeading>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-start">
              {isClient ? (
                <ProjectVideo src="/videos/video-portfolio-short.mp4" />
              ) : (
                <div className="w-full h-[200px] bg-gray-800 animate-pulse" />
              )}
              <div className="h-full place-content-center pr-[25%]">
                <ProjectText>
                  Automated 5G signal testing powered by gRPC and Consul
                </ProjectText>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <ProjectHeading>XCuisite Ecommerce Website</ProjectHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 text-start">
            {isClient ? (
              <ProjectVideo src="/videos/video-xcuisite-1.mp4" />
            ) : (
              <div className="w-full h-[200px] bg-gray-800 animate-pulse" />
            )}
            <div className="h-full place-content-center pr-[25%]">
              <LinkPreview
                className="text-xl lg:text-3xl font-bold"
                url="https://xcuisite.store"
              >
                Link
              </LinkPreview>
            </div>
            {isClient ? (
              <ProjectVideo src="/videos/video-xcuisite-2.mp4" />
            ) : (
              <div className="w-full h-[200px] bg-gray-800 animate-pulse" />
            )}
            <div className="h-full place-content-center pr-[25%]">
              <ProjectText>Effective Cart System With Animations</ProjectText>
            </div>
            {isClient ? (
              <ProjectVideo src="/videos/video-xcuisite-3.mp4" />
            ) : (
              <div className="w-full h-[200px] bg-gray-800 animate-pulse" />
            )}
            <div className="h-full place-content-center pr-[25%]">
              <ProjectText>
                Authentication and Payment Gateway Integration
              </ProjectText>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Early 2024",
      content: (
        <div>
          <ProjectHeading>SCCC Articulatory Accent Database</ProjectHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-start">
            {isClient ? (
              <ProjectVideo src="/videos/video-sccc.mp4" />
            ) : (
              <div className="w-full h-[200px] bg-gray-800 animate-pulse" />
            )}
            <div className="h-full place-content-center pr-[25%]">
              <ProjectText>Collection of Recorded Audios</ProjectText>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full relative text-center bg-transparent">
      <SectionHeading className="pt-[10rem] mb-[5rem]">Projects</SectionHeading>
      <Timeline data={data} onUpdateHeight={isClient} />
    </div>
  );
}
