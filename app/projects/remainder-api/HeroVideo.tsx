"use client";

import { SectionHeading } from "@/components/Headings/SectionHeading";
import { ProjectDetail } from "@/components/Projects/ProjectDetail";
import { ProjectText } from "@/components/Projects/ProjectText";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

export function HeroVideo({ id }: { id: string }) {
  return (
    <ScrollableSection id={id}>
      <SectionHeading>What Can It Do</SectionHeading>
      <ProjectText className="text-center">
        Integrate into different parts of the ecosystem — like chatbots, apps,
        or web services.
      </ProjectText>
      <ProjectDetail
        videoSrc="/videos/remainderApi/main.mp4"
        multipleCol={false}
        height="500px"
        width={750}
        className="mb-[20dvh]"
      >
        <ProjectText className="tracking-wider">
          Access your reminders anywhere, anytime.
        </ProjectText>
        <LinkPreview
          className="text-xl lg:text-3xl font-bold py-0"
          url="https://github.com/ZSHenChan/reminderApi"
        >
          Github
        </LinkPreview>
      </ProjectDetail>
    </ScrollableSection>
  );
}
