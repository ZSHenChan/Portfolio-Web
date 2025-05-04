"use client";
import { ProjectHeading } from "../../Projects/ProjectHeading";
import { ProjectText } from "../../Projects/ProjectText";
import { ProjectDetail } from "../../Projects/ProjectDetail";
// import { LinkPreview } from "@/components/Contact/LinkPreview";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

function HologramProject() {
  return (
    <ScrollableSection id="hologram">
      <ProjectHeading>Internship - AV Media</ProjectHeading>
      <ProjectDetail imgSrc="/image/hologram.png" width={600}>
        <ProjectHeading className="lg:text-2xl font-bold">
          Interactive Hologram AI Chatbot
        </ProjectHeading>
        <ProjectText>Interactive Hologram AI Chatbot</ProjectText>
        {/* <LinkPreview
          url="/projects/hologram"
          className="text-xl lg:text-3xl font-bold"
          isStatic
          imageSrc="/image/preview-am"
        >
          Learn More
        </LinkPreview> */}
      </ProjectDetail>
    </ScrollableSection>
  );
}

export { HologramProject };
