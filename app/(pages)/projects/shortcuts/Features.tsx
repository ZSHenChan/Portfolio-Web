"use client";

import { SectionHeading } from "@/components/Headings/SectionHeading";
import { ProjectDetail } from "@/components/Projects/ProjectDetail";
import { ProjectHeading } from "@/components/Projects/ProjectHeading";
import { ProjectText } from "@/components/Projects/ProjectText";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

export const Features = ({ id }: { id: string }) => {
  return (
    <ScrollableSection id={id} className="mb-[15dvh] place-items-center">
      <SectionHeading className="md:text-3xl">Features</SectionHeading>

      <ProjectDetail
        videoSrc="/videos/shortcuts/calendar1080.mp4"
        multipleCol
        height="300px"
        className="mb-[10dvh] text-start place-items-center"
      >
        <ProjectHeading>Event Capture</ProjectHeading>
        <ProjectText className="sm:mb-4">
          Seamlessly capture events from your screen.
        </ProjectText>
        <ProjectText className="sm:mb-4">
          With a simple selection, you can instantly turn any on-screen
          information—from emails to web pages—into a calendar event,
          intelligently filtering out unnecessary text.
        </ProjectText>
      </ProjectDetail>

      <ProjectDetail
        videoSrc="/videos/shortcuts/calendar-conversation.mp4"
        multipleCol
        height="300px"
        className="mb-[10dvh] place-items-center"
      >
        <ProjectHeading>Conversation Awareness</ProjectHeading>
        <ProjectText className="sm:mb-4">
          Intelligently capture key details from a conversation.
        </ProjectText>
        <ProjectText className="sm:mb-4">
          This feature listens for and extracts crucial information, such as
          dates, times, and locations, so you can effortlessly turn spoken
          commitments into calendar entries.
        </ProjectText>
      </ProjectDetail>

      <ProjectDetail
        videoSrc="/videos/shortcuts/calendar-multievent.mp4"
        multipleCol
        height="300px"
        className="place-items-center mb-[10dvh]"
      >
        <ProjectHeading>Batch Event Creation</ProjectHeading>
        <ProjectText className="sm:mb-4">
          Add multiple events in a single command.{" "}
        </ProjectText>
        <ProjectText className="sm:mb-4">
          Save significant time by registering a list of events at once, perfect
          for planning a trip or a full day of meetings.
        </ProjectText>
      </ProjectDetail>

      <ProjectText>- speak it. schedule it. simple. -</ProjectText>
    </ScrollableSection>
  );
};
