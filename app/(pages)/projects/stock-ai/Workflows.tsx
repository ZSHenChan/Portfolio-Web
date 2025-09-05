"use client";

import { SectionHeading } from "@/components/Headings/SectionHeading";
import { ProjectText } from "@/components/Projects/ProjectText";
import { ScrollableSection } from "@/components/layout/ScrollableSection";
import Image from "next/image";

export const Workflows = ({ id }: { id: string }) => {
  return (
    <ScrollableSection id={id} className="mb-[18dvh] place-items-center">
      <SectionHeading className="md:text-3xl">Workflows</SectionHeading>
      <Image
        width={600}
        height={300}
        src="/image/workflow.png"
        alt="Workflow Demo diagram"
        className="mb-12"
      ></Image>
      <ProjectText className="text-center max-w-[70ch]">
        Beyond Basic Prompts: Pipeline combining semantic context retrieval and
        function execution allows LLMs to handle complex requests and provide
        reliable answers.
      </ProjectText>
    </ScrollableSection>
  );
};
