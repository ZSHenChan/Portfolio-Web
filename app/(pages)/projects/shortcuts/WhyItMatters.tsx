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
        words="Manually adding an event to your calendar is a <b>repetitive and <b>interruptive task. It forces you to stop what you're doing, open an app, navigate multiple menus, and type in details, breaking your focus. Event Capture solves that by allowing you to capture new events <b>instantly and automatically, so you never have to break your workflow to stay <b>organized."
      />
    </ScrollableSection>
  );
};
