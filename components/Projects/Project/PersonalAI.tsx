"use client";
import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { ProjectDetail } from "../ProjectDetail";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

function PersonalAIProject() {
  return (
    <ScrollableSection id="personal-assistant">
      <ProjectHeading>Personal AI Assistant</ProjectHeading>
      <ProjectDetail videoSrc="/videos/portfolio-short.mp4" multipleCol>
        <ProjectText className="max-w-[33ch]">
          Fine-tuned AI to handle queries.
        </ProjectText>
      </ProjectDetail>
      <ProjectDetail videoSrc="/videos/portfolio-scroll.mp4" multipleCol>
        <ProjectText>Action Execution</ProjectText>
        <LinkPreview
          url="zishenchan/projects/personal-ai"
          className="text-xl lg:text-3xl font-bold"
        >
          Learn More
        </LinkPreview>
      </ProjectDetail>
    </ScrollableSection>
  );
}

export { PersonalAIProject };
