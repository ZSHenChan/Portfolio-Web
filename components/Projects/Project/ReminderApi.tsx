"use client";
import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { ProjectDetail } from "../ProjectDetail";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

function ReminderApiProject() {
  return (
    <ScrollableSection id="reminder-api">
      <ProjectHeading>Reminder API</ProjectHeading>
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
        videoSrc="/videos/reminder-api-auth.mp4"
        height="300px"
        multipleCol
      >
        <ProjectText>Secured by Authentication</ProjectText>
      </ProjectDetail>
      <ProjectDetail
        videoSrc="/videos/reminder-api-interaction.mp4"
        multipleCol
        height="300px"
      >
        <ProjectText>AI Interaction</ProjectText>
        <LinkPreview
          url="./app/reminders"
          className="text-xl lg:text-3xl font-bold"
        >
          Playground
        </LinkPreview>
      </ProjectDetail>
    </ScrollableSection>
  );
}

export { ReminderApiProject };
