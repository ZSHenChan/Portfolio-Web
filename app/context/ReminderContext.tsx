import { createContext, useContext } from "react";
import { Reminder } from "@/app/interfaces/Reminder";
import React, { useReducer } from "react";

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

const initialReminders: Reminder[] = [];

function reminderReducer(
  reminders: Reminder[],
  action: {
    type: string;
    reminders: Reminder[];
  }
) {
  switch (action.type) {
    case "add": {
      return [...reminders, ...action.reminders];
    }

    case "delete": {
      return reminders.filter(
        (reminder: Reminder) => reminder.id !== action.reminders[0].id
      );
    }

    case "fetch": {
      return action.reminders;
    }

    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}

export function ReminderProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(reminderReducer, initialReminders);

  return (
    <ReminderContext.Provider value={tasks}>
      <ReminderDispatchContext.Provider value={dispatch}>
        {children}
      </ReminderDispatchContext.Provider>
    </ReminderContext.Provider>
  );
}
