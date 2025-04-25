"use client";

import { useEffect } from "react";
import { ReminderCard } from "./ReminderCard";
import {
  useReminderDispatch,
  useReminders,
} from "@/app/context/ReminderContext";
import { fetchReminders, QueryObject } from "@/app/api/reminderApi";
import { reportErrorMessage } from "../utils/handleErrorMsg";
import toast from "react-hot-toast";
import { Reminder } from "@/app/interfaces/Reminder";

export function ReminderGrid() {
  const dispatch = useReminderDispatch();
  const reminders = useReminders() as Reminder[];

  useEffect(() => {
    const fetchRemindersAsync = async () => {
      const response = await fetchReminders({} as QueryObject);
      if (response.error) {
        reportErrorMessage("Could not fetch reminders", response.message);
        return;
      }

      if (dispatch != null)
        dispatch({
          type: "fetch",
          reminders: response.reminders as Reminder[],
        });
    };

    toast.promise(fetchRemindersAsync, {
      loading: "Loading reminders...",
      success: "Reminders loaded successfully",
      error: "Could not load reminders",
    });
  }, [dispatch]);

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mb-[10dvh]">
      {reminders.map((rmd) => (
        <ReminderCard
          key={rmd.id}
          title={rmd.title}
          type={rmd.reminderType}
          description={rmd.description}
          date={rmd.dueDate}
          // description={
          //   "Desc loren ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          // }
        />
      ))}
    </div>
  );
}
