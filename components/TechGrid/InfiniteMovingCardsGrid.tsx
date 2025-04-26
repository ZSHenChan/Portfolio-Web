"use client";

import React from "react";
import { InfiniteMovingCards } from "./InfiniteCard";
import { ScrollableSection } from "@/components/layout/ScrollableSection";
import { useScrollTargetRegistration } from "@/app/context/UIStateContext";

export function InfiniteMovingCardsGrid() {
  const sectionId = "tech-stack";
  useScrollTargetRegistration(sectionId);

  return (
    <ScrollableSection className="mb-[10rem]" id={sectionId}>
      <div className="h-[128px] md:h-[256px] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
      <div className="h-[128px] md:h-[256px] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials2}
          direction="left"
          speed="slow"
        />
      </div>
    </ScrollableSection>
  );
}
const iconList = [
  "azure",
  "cloud",
  "devops",
  "docker",
  "git",
  "dotnet",
  "grpc",
  "linux",
  "nextjs",
  "postgres",
  "python",
  "react",
  "rest",
  "sass",
];
const testimonials = iconList
  .slice(0, iconList.length / 2)
  .map((name: string) => {
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      url: `/temp/${name}.png`,
      svgName: name,
    };
  });

const testimonials2 = iconList
  .slice(iconList.length / 2)
  .map((name: string) => {
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      url: `/temp/${name}.png`,
      svgName: name,
    };
  });
