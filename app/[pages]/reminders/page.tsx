"use client";

import {
  DottedBackground,
  DottedInnerWrapper,
} from "@/components/ui/DottedBackground";
import { SectionHeading } from "@/components/Headings/SectionHeading";
import { ProjectText } from "@/components/Projects/ProjectText";

import { ReminderProvider } from "@/app/context/ReminderContext";
import { ReminderGrid } from "./ReminderGrid";

export default function RemindersPage() {
  return (
    <ReminderProvider>
      <DottedBackground>
        <DottedInnerWrapper className="py-[5dvh]">
          <SectionHeading className="md:text-5xl " animation={false}>
            Reminders
          </SectionHeading>
          <ProjectText className="text-slate-500">
            A playground for visitors
          </ProjectText>
          <ReminderGrid />
        </DottedInnerWrapper>
      </DottedBackground>
    </ReminderProvider>
  );
}
