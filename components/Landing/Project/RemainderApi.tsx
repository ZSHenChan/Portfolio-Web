"use client";
import { ProjectHeading } from "../../Projects/ProjectHeading";
import { ProjectText } from "../../Projects/ProjectText";
import { ProjectDetail } from "../../Projects/ProjectDetail";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

function RemainderApiProject() {
  return (
    <ScrollableSection id="reminder-api">
      <ProjectHeading>Remainder API</ProjectHeading>
      <ProjectDetail
        videoSrc="/videos/reminder-api.mp4"
        height="300px"
        multipleCol
      >
        <ProjectText className="max-w-[33ch]">Boosted by Redis</ProjectText>
        <LinkPreview
          url="https://reminder-demo-app.vercel.app/"
          className="text-xl lg:text-3xl font-bold"
        >
          Demo
        </LinkPreview>
      </ProjectDetail>
      <ProjectDetail
        videoSrc="/videos/reminder-api-interaction.mp4"
        multipleCol
        height="300px"
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
        videoSrc="/videos/reminder-api-auth.mp4"
        height="300px"
        multipleCol
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
