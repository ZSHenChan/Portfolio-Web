"use client";

import { SectionHeading } from "../Headings/SectionHeading";
import { ScrollableSection } from "../layout/ScrollableSection";
import { TextGenerateEffect } from "../ui/text-generate-effect";

// const words =
//   "I bridge the gap between AI and <b>software by developing intelligent applications that solve real-world business challenges and streamline repetitive operations. I love discovering how <b>AI can intersect with practical software development to create genuinely <b>intuitive solutions.";

const words =
  "I love discovering how AI can intersect with <b>software to create genuinely intuitive solutions. With a background in Math and Computer Science from <b>NTU, I bring a <b>rigorous analytical approach to <b>automating repetitive operations, ensuring that every AI solution I build is as <b>robust as it is innovative.";

export const SectionAbout = ({ id }: { id: string }) => {
  return (
    <>
      <ScrollableSection id={id} className="mb-[35dvh] px-[10dvw] gap-5">
        <div className="h-[18dvh]"></div>
        <SectionHeading>About Me</SectionHeading>
        <TextGenerateEffect
          className="text-center text-lg lg:text-xl gap-5"
          textContainerClass="md:leading-[1.6]"
          delay={0}
          filter={false}
          words={words}
        />
      </ScrollableSection>
    </>
  );
};
