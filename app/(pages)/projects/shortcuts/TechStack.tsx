"use client";
import { ScrollableSection } from "@/components/layout/ScrollableSection";
import { ProjectTechStack } from "@/components/Projects/ProjectTechStack";

export const PersonalAITechStack = ({ id }: { id: string }) => {
  const iconList = ["shortcuts", "gemini", "calendar"];
  return (
    <ScrollableSection id={id} className="mb-[20dvh]">
      <ProjectTechStack title="Core Technologies" iconList={iconList} />
    </ScrollableSection>
  );
};
