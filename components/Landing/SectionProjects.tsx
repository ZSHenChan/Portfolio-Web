"use client";
import { SectionHeading } from "../Headings/SectionHeading";
import React, { useState, useEffect } from "react";
import { Timeline } from "@/components/ui/Timeline";
import { PersonalAIProject } from "../Landing/Project/PersonalAI";
import { XcuisiteProject } from "../Landing/Project/Xcuisite";
import { RemainderApiProject } from "../Landing/Project/RemainderApi";
import { ScrollableSection } from "../layout/ScrollableSection";
import { TimelineMobile } from "@/components/ui/TimelineMobile";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

export function SectionProjects({ id }: { id: string }) {
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = [
    {
      title: "2025",
      content: <RemainderApiProject />,
    },
    {
      title: "Early 2025",
      content: <PersonalAIProject />,
    },
    {
      title: "2024",
      content: <XcuisiteProject />,
    },
  ];
  return (
    <ScrollableSection
      id={id}
      className="w-full relative text-center bg-transparent lg:mb-[25dvh]"
    >
      <div className="h-[8dvh]" />
      <SectionHeading>Projects</SectionHeading>
      {isMobile ? (
        <TimelineMobile data={data} />
      ) : (
        <Timeline data={data} onUpdateHeight={isClient} />
      )}
    </ScrollableSection>
  );
}
