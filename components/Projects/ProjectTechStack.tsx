"use client";
import { SectionHeading } from "@/components/Headings/SectionHeading";
import { ProjectText } from "@/components/Projects/ProjectText";
import {
  InfiniteCard,
  InfiniteCardInterface,
} from "@/components/ui/InfiniteCard";

export interface ProjectTechStackInterface {
  title?: string;
  postTitle?: string;
  iconList: string[];
}

export const ProjectTechStack = ({
  iconList,
  title = "Core Frameworks",
  postTitle = "and more...",
}: ProjectTechStackInterface) => {
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

  return (
    <>
      <SectionHeading>{title}</SectionHeading>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] align-items-center lg:flex px-8 justify-center min-w-full gap-4 py-1 w-max mb-8">
        {cardItemList.map((item: InfiniteCardInterface) => InfiniteCard(item))}
      </ul>
      <ProjectText className="text-center">{postTitle}</ProjectText>
    </>
  );
};
