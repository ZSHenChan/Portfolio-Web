import { createContext, useContext } from "react";
import { Reminder } from "@/app/interfaces/Reminder";

export const ReminderContext = createContext([] as Reminder[]);
export const ReminderDispatchContext = createContext(
  null as React.ActionDispatch<
    [
      action: {
        type: string;
        reminders: Reminder[];
      }
    ]
  > | null
);

export function useReminders() {
  return useContext(ReminderContext);
}

export function useReminderDispatch() {
  return useContext(ReminderDispatchContext);
}
