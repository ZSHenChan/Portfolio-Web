"use client";

import { SectionHeading } from "@/components/Headings/SectionHeading";
import { ProjectDetail } from "@/components/Projects/ProjectDetail";
import { ProjectText } from "@/components/Projects/ProjectText";
import { ProjectHeading } from "@/components/Projects/ProjectHeading";
import { CompareDetail } from "./CompareDetail";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

export function Features({ id }: { id: string }) {
  return (
    <ScrollableSection id={id} className="mb-[15dvh] place-items-center">
      <SectionHeading className="md:text-3xl">Features</SectionHeading>

      <ProjectDetail
        videoSrc="/videos/reminder-api-auth.mp4"
        multipleCol
        height="300px"
        className="place-items-center mb-[10dvh]"
      >
        <ProjectHeading className="lg:text-start">
          Secured Access
        </ProjectHeading>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - Utilizes ASP.NET Core Identity to keep track of current users.
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - Employs Password authentication for simplified login process.
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
          - Uses encrypted Jwt tokens for secured transactions and access to
          database.
        </ProjectText>
      </ProjectDetail>

      <ProjectDetail
        videoSrc="/videos/reminder-api-interaction.mp4"
        multipleCol
        height="300px"
        className="place-items-center mb-[10dvh]"
      >
        <ProjectHeading className="lg:text-start">
          Seamless AI Integration
        </ProjectHeading>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - Secure JWT authentication (persistent tokens) enables seamless
          integration with external services, including AI, for reminder
          modification.
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - Designed to support features like automatic task prioritization
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
          - Effortless integration with scheduling tools or AI agents for
          managing meeting reminders for attendees.
        </ProjectText>
      </ProjectDetail>

      <CompareDetail
        multipleCol
        firstImage="/image/reminder-api-priority-in.jpeg"
        secondImage="/image/reminder-api-priority-out.jpeg"
        className="place-items-center mb-[10dvh]"
      >
        <ProjectHeading className="lg:text-start">
          Data Validation
        </ProjectHeading>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - Validation is performed before modifying data.
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - The ModelState filter detects malformed data and invalid input
          fields.
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
          - Always return detailed response to simplify debugging process.
        </ProjectText>
      </CompareDetail>
    </ScrollableSection>
  );
}
