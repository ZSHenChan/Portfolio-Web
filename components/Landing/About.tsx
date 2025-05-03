"use client";

import { SectionHeading } from "../Headings/SectionHeading";
import { ScrollableSection } from "../layout/ScrollableSection";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const words =
  "I'm a software engineer specializing in building fullstack web applications using React and .NET. I love building efficient APIs and web services that make life easier by cutting out repetitive tasks and helping people focus on what matters. I love exploring new ways AI can intersect with practical software development, while ensuring intuitive usage.";

export const About = ({ id }: { id: string }) => {
  return (
    <>
      <ScrollableSection id={id} className="mb-[35dvh] px-[10dvw] gap-5">
        <div className="h-[18dvh]"></div>
        <SectionHeading>About Me</SectionHeading>
        <TextGenerateEffect
          className="text-center text-2xl gap-5"
          delay={0}
          filter={false}
          words={words}
        />
      </ScrollableSection>
    </>
  );
};
