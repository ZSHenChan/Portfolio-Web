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
        videoSrc="/videos/stockAI/help.mp4"
        multipleCol
        height="300px"
        className="place-items-center mb-[10dvh]"
      >
        <ProjectHeading>Intuitive Help</ProjectHeading>
        <ProjectText className="sm:mb-4">
          Get unstuck instantly with a comprehensive help command that guides
          you through every function.
        </ProjectText>
      </ProjectDetail>

      <ProjectDetail
        videoSrc="/videos/stockAI/main.mp4"
        multipleCol
        height="300px"
        className="mb-[10dvh] text-start place-items-center"
      >
        <ProjectHeading>AI-powered Company Research</ProjectHeading>
        <ProjectText className="sm:mb-4">
          Seamlessly research any company without leaving the tab. Access
          real-time financial data, key reports, and in-depth insights to make
          smarter decisions, all with a single command.
        </ProjectText>
      </ProjectDetail>

      <ProjectDetail
        videoSrc="/videos/stockAI/earnings.mp4"
        multipleCol
        height="300px"
        className="mb-[10dvh] place-items-center"
      >
        <ProjectHeading>Upcoming Earnings Calendar</ProjectHeading>
        <ProjectText className="sm:mb-4">
          Dynamically track and discover companies releasing earnings in the
          future, helping you stay ahead of the market.
        </ProjectText>
      </ProjectDetail>

      <ProjectDetail
        videoSrc="/videos/stockAI/events.mp4"
        multipleCol
        height="300px"
        className="place-items-center mb-[10dvh]"
      >
        <ProjectHeading>Critical Events Monitor</ProjectHeading>
        <ProjectText className="sm:mb-4">
          Gain a competitive edge by tracking future company events. Search for
          and important notices like product releases and conferences.
        </ProjectText>
      </ProjectDetail>

      <ProjectText>- all-in-one power, zero complexity. -</ProjectText>
    </ScrollableSection>
  );
};
