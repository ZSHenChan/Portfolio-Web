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
      <ProjectDetail videoSrc="/videos/reminder-api.mp4" multipleCol>
        <ProjectText className="max-w-[33ch]">Effective Storage</ProjectText>
        <LinkPreview
          url="./reminders"
          className="text-xl lg:text-3xl font-bold"
        >
          Demo
        </LinkPreview>
      </ProjectDetail>
      <ProjectDetail videoSrc="/videos/reminder-api-auth.mp4" multipleCol>
        <ProjectText>Authentication</ProjectText>
      </ProjectDetail>
      <ProjectDetail videoSrc="/videos/reminder-api-auth.mp4" multipleCol>
        <ProjectText>AI Interaction</ProjectText>
        <LinkPreview
          url="./reminders"
          className="text-xl lg:text-3xl font-bold"
        >
          Playground
        </LinkPreview>
      </ProjectDetail>
    </ScrollableSection>
  );
}

export { ReminderApiProject };
