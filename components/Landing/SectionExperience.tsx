"use client";
import { SectionHeading } from "../Headings/SectionHeading";
import { Timeline } from "@/components/ui/Timeline";
import { AutomtionManagerProject } from "../Landing/Project/AutomationManager";
import { ScccProject } from "../Landing/Project/Sccc";
import { ScrollableSection } from "../layout/ScrollableSection";
import { HologramProject } from "./Project/Hologram";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { TimelineMobile } from "../ui/TimelineMobile";

export function SectionExperience({ id }: { id: string }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const data = [
    {
      title: "2025",
      content: <AutomtionManagerProject />,
    },
    {
      title: "2024",
      content: <HologramProject />,
    },
    {
      title: "Early 2024",
      content: <ScccProject />,
    },
  ];
  return (
    <ScrollableSection
      id={id}
      className="w-full relative bg-transparent lg:mb-[25dvh]"
    >
      <div className="h-[8dvh]" />
      <SectionHeading className="">Experiences</SectionHeading>
      {isMobile ? <TimelineMobile data={data} /> : <Timeline data={data} />}
    </ScrollableSection>
  );
}
