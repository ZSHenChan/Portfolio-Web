"use client";

import React, { useRef, useEffect } from "react";
import { InfiniteMovingCards } from "./InfiniteCard";
import { useRefs } from "@/app/context/RefsContext";

export function InfiniteMovingCardsGrid() {
  const { registerRef } = useRefs();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    registerRef("techstack", sectionRef.current);
  }, [registerRef, sectionRef]);

  return (
    <div className="mb-[10rem]" ref={sectionRef}>
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
    </div>
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
