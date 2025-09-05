"use client";

import { SectionHeading } from "@/components/Headings/SectionHeading";
import { ScrollableSection } from "@/components/layout/ScrollableSection";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export const WhyItMatters = ({ id }: { id: string }) => {
  return (
    <ScrollableSection
      id={id}
      className="px-[2rem] md:px-0 text-sm md:text-lg mb-[18dvh] place-items-center"
    >
      <SectionHeading>Why It Matters</SectionHeading>
      <TextGenerateEffect
        className="md:text-xl max-w-[85ch] text-center mb-24 text-slate-50"
        delay={2}
        words="Manually researching a company is often a fragmented and <b>inefficient process. It typically involves piling up multiple browser tabs for different data sources, using separate tools for analysis, and compiling the information into a report or a spreadsheet. StockAI addresses that core problem by consolidating the entire research and reporting lifecycle into a <b>single, accessible interface with the capabilities of <b>AI."
      />
    </ScrollableSection>
  );
};
