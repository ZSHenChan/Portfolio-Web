"use client";
import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { ProjectDetail } from "../ProjectDetail";
import { useEffect, useRef } from "react";
import { useRefs } from "@/app/context/RefsContext";
import { LinkPreview } from "@/components/Contact/LinkPreview";

function PersonalAIProject() {
  const { registerRef } = useRefs();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    registerRef("personal-assistant", sectionRef.current);
  }, [registerRef, sectionRef]);
  return (
    <div ref={sectionRef}>
      <ProjectHeading>Personal AI Assistant</ProjectHeading>
      <ProjectDetail videoSrc="/videos/video-portfolio-short.mp4" multipleCol>
        <ProjectText className="max-w-[33ch]">
          Fine-tuned AI to handle queries.
        </ProjectText>
      </ProjectDetail>
      <ProjectDetail videoSrc="/videos/video-portfolio-scroll.mp4" multipleCol>
        <ProjectText>Action Execution</ProjectText>
        <LinkPreview
          url="./projects/personal-ai"
          className="text-xl lg:text-3xl font-bold"
        >
          Learn More
        </LinkPreview>
      </ProjectDetail>
    </div>
  );
}

export { PersonalAIProject };
