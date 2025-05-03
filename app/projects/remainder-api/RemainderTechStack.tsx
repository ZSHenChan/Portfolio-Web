"use client";
import { SectionHeading } from "@/components/Headings/SectionHeading";
import { ScrollableSection } from "@/components/layout/ScrollableSection";
import { ProjectText } from "@/components/Projects/ProjectText";
import {
  InfiniteCard,
  InfiniteCardInterface,
} from "@/components/TechGrid/InfiniteCard";

const iconList = ["dotnet-core", "postgres", "ef-core", "jwt", "rest"];
const cardItemList = iconList.map((name: string) => {
  return {
    name: name
      .split("-")
      .map(
        (splitWord) => splitWord.charAt(0).toUpperCase() + splitWord.slice(1)
      )
      .join(" "),
    url: `/tech/${name}.png`,
    svgName: name,
  };
});
export const RemaindersTechStack = ({ id }: { id: string }) => {
  return (
    <ScrollableSection id={id} className="mb-[20dvh]">
      <SectionHeading>Core Frameworks</SectionHeading>
      <ul className="flex justify-center min-w-full shrink-0 gap-4 py-1 w-max flex-nowrap mb-8">
        {cardItemList.map((item: InfiniteCardInterface) => InfiniteCard(item))}
      </ul>
      <ProjectText className="text-center">And More...</ProjectText>
    </ScrollableSection>
  );
};
