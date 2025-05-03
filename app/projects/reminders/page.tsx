"use client";

// TODO - Create another chatbot input with function call for local adding new reminders

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
          <ProjectText className="text-slate-500 text-center max-w-[70ch]">
            For security reasons, reminders created by the Assistant are not
            displayed here. To observe the reminder creation process, use the
            input field below.
          </ProjectText>
          <ReminderGrid />
        </DottedInnerWrapper>
      </DottedBackground>
    </ReminderProvider>
  );
}
