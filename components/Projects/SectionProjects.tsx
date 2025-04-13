"use client";
import { SectionHeading } from "../Headings/SectionHeading";
import React, { useState, useEffect } from "react";
import { Timeline } from "@/components/ui/Timeline";
import { PersonalAIProject } from "./Project/PersonalAI";
import { AutomtionManagerProject } from "./Project/AutomationManager";
import { XcuisiteProject } from "./Project/Xcuisite";
import { ScccProject } from "./Project/Sccc";
import { ReminderApiProject } from "./Project/ReminderApi";

export function SectionProjects() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = [
    {
      title: "2025",
      content: (
        <div className="grid grid-cols-1 gap-32">
          <ReminderApiProject />
        </div>
      ),
    },
    {
      title: "Early 2025",
      content: (
        <div className="grid grid-cols-1 gap-32">
          <PersonalAIProject />
          <AutomtionManagerProject />
        </div>
      ),
    },
    {
      title: "2024",
      content: <XcuisiteProject />,
    },
    {
      title: "Early 2024",
      content: <ScccProject />,
    },
  ];
  return (
    <div className="w-full relative text-center bg-transparent">
      <SectionHeading className="pt-[10rem] mb-[5rem]">Projects</SectionHeading>
      <Timeline data={data} onUpdateHeight={isClient} />
    </div>
  );
}
