"use client";

import { useEffect } from "react";
import { ReminderCard } from "./ReminderCard";
import {
  useReminderDispatch,
  useReminders,
} from "@/app/context/ReminderContext";
// import { fetchReminders, QueryObject } from "@/app/api/reminderApi";
import { Reminder } from "@/app/interfaces/Reminder";
import { ProjectHeading } from "@/components/Projects/ProjectHeading";
import { useAppActions } from "@/app/context/AppActionsContext";
import toast from "react-hot-toast";

export function ReminderGrid() {
  const dispatch = useReminderDispatch();
  const reminders = useReminders() as Reminder[];
  const { reminderCounter } = useAppActions();

  useEffect(() => {
    const fetchRemindersAsync = async () => {
      const fetchReminderId = toast.loading("Loading Reminders...");
      toast.success("Load reminders successfully.", { id: fetchReminderId });
      // const response = await fetchReminders({} as QueryObject);
      // if (response.error) {
      //   toast.error(response.message, { id: fetchReminderId });
      //   return;
      // }

      // if (dispatch != null) {
      //   dispatch({
      //     type: "fetch",
      //     reminders: response.reminders as Reminder[],
      //   });
      // }
    };
    fetchRemindersAsync();
  }, [dispatch, reminderCounter]);

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mb-[10dvh]">
      {!reminders && <ProjectHeading>No Reminders</ProjectHeading>}
      {reminders &&
        reminders.map((rmd) => (
          <ReminderCard
            key={rmd.id}
            title={rmd.title}
            type={rmd.reminderType}
            description={rmd.description}
            date={rmd.dueDate}
          />
        ))}
    </div>
  );
}
