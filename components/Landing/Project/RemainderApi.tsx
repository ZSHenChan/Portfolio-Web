"use client";
import { ProjectHeading } from "../../Projects/ProjectHeading";
import { ProjectText } from "../../Projects/ProjectText";
import { ProjectDetail } from "../../Projects/ProjectDetail";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

function RemainderApiProject() {
  return (
    <ScrollableSection id="reminder-api">
      <ProjectHeading>RemAInder API</ProjectHeading>
      <ProjectDetail
        videoSrc="/videos/remainderApi/main.mp4"
        height="300px"
        multipleCol
        className="sm:text-center"
      >
        <ProjectText>Boosted by Redis</ProjectText>
        <LinkPreview
          url="https://reminder-demo-app.vercel.app/"
          className="text-xl lg:text-3xl font-bold"
        >
          Demo
        </LinkPreview>
      </ProjectDetail>
      <ProjectDetail
        videoSrc="/videos/remainderApi/interaction.mp4"
        multipleCol
        height="300px"
        className="sm:text-center"
      >
        <ProjectText>AI Interaction</ProjectText>
        <LinkPreview
          url="./projects/reminders"
          className="text-xl lg:text-3xl font-bold"
          isStatic
          imageSrc="/image/preview-remainder-playground.png"
        >
          Playground
        </LinkPreview>
      </ProjectDetail>
      <ProjectDetail
        videoSrc="/videos/remainderApi/auth.mp4"
        height="300px"
        multipleCol
        className="sm:text-center"
      >
        <ProjectText>Secured by Authentication</ProjectText>
        <LinkPreview
          url="./projects/remainder-api"
          className="text-xl lg:text-3xl font-bold"
          isStatic
          imageSrc="/image/preview-remainder-api.png"
        >
          Learn More
        </LinkPreview>
      </ProjectDetail>
    </ScrollableSection>
  );
}

export { RemainderApiProject };
