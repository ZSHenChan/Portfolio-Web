"use client";

import { SectionHeading } from "../Headings/SectionHeading";
import { ScrollableSection } from "../layout/ScrollableSection";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const words =
  "I bridge the gap between AI and <b>software, developing intelligent applications that solve real-world business challenges and streamline repetitive operations. I'm passionate about discovering how <b>AI can intersect with practical software development to create genuinely <b>intuitive solutions.";

export const SectionAbout = ({ id }: { id: string }) => {
  return (
    <>
      <ScrollableSection id={id} className="mb-[35dvh] px-[10dvw] gap-5">
        <div className="h-[18dvh]"></div>
        <SectionHeading>About Me</SectionHeading>
        <TextGenerateEffect
          className="text-center text-lg lg:text-2xl gap-5"
          textContainerClass="md:leading-[1.6]"
          delay={0}
          filter={false}
          words={words}
        />
      </ScrollableSection>
    </>
  );
};
