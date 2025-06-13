"use client";
import { ScrollableSection } from "@/components/layout/ScrollableSection";
import { ProjectTechStack } from "@/components/Projects/ProjectTechStack";

export const RemaindersTechStack = ({ id }: { id: string }) => {
  const iconList = ["dotnet-core", "postgres", "ef-core", "jwt", "rest"];
  return (
    <ScrollableSection id={id} className="mb-[20dvh]">
      <ProjectTechStack iconList={iconList} />
    </ScrollableSection>
  );
};
