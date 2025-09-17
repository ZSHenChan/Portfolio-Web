"use client";
import { ProjectHeading } from "../../Projects/ProjectHeading";
import { ProjectText } from "../../Projects/ProjectText";
import { ProjectDetail } from "../../Projects/ProjectDetail";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

function ShortcutsCalendar() {
  return (
    <ScrollableSection id="event-capture">
      <ProjectHeading>AI Event Capture</ProjectHeading>
      <ProjectDetail
        videoSrc="/videos/shortcuts/calendar-preview.mp4"
        height="300px"
        multipleCol
        className="sm:text-center"
      >
        <ProjectText className="mb-2">One Command to</ProjectText>
        <ProjectText>Register Multiple Events</ProjectText>
        <LinkPreview
          url="./projects/shortcuts"
          className="text-xl lg:text-3xl font-bold"
          isStatic
          imageSrc="/image/preview-event-capture.png"
        >
          Learn More
        </LinkPreview>
      </ProjectDetail>
    </ScrollableSection>
  );
}

export { ShortcutsCalendar };
