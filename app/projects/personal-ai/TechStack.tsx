"use client";
import { ScrollableSection } from "@/components/layout/ScrollableSection";
import { ProjectTechStack } from "@/components/Projects/ProjectTechStack";

export const PersonalAITechStack = ({ id }: { id: string }) => {
  const iconList = ["aceternity", "function-app", "gemini", "txtai", "python"];
  return (
    <ScrollableSection id={id} className="mb-[20dvh]">
      <ProjectTechStack iconList={iconList} />
    </ScrollableSection>
  );
};
