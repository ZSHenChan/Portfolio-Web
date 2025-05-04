"use client";
import { SectionHeading } from "../Headings/SectionHeading";
import React, { useState, useEffect } from "react";
import { Timeline } from "@/components/ui/Timeline";
import { PersonalAIProject } from "../Landing/Project/PersonalAI";
import { XcuisiteProject } from "../Landing/Project/Xcuisite";
import { RemainderApiProject } from "../Landing/Project/RemainderApi";
import { ScrollableSection } from "../layout/ScrollableSection";

export function SectionProjects({ id }: { id: string }) {
  const [isClient, setIsClient] = useState(false);
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
      className="w-full relative text-center bg-transparent mb-[25dvh]"
    >
      <div className="h-[8dvh]" />
      <SectionHeading className="">Projects</SectionHeading>
      <Timeline data={data} onUpdateHeight={isClient} />
    </ScrollableSection>
  );
}
