"use client";
import { SectionHeading } from "../Headings/SectionHeading";
import React, { useState, useEffect } from "react";
import { Timeline } from "@/components/ui/Timeline";
import { AutomtionManagerProject } from "../Landing/Project/AutomationManager";
import { ScccProject } from "../Landing/Project/Sccc";
import { ScrollableSection } from "../layout/ScrollableSection";
import { HologramProject } from "./Project/Hologram";

export function SectionExperience({ id }: { id: string }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

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
      className="w-full relative text-center bg-transparent mb-[25dvh]"
    >
      <div className="h-[8dvh]" />
      <SectionHeading className="">Experiences</SectionHeading>
      <Timeline data={data} onUpdateHeight={isClient} />
    </ScrollableSection>
  );
}
