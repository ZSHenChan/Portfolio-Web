import { createContext, useContext } from "react";
import { Reminder } from "@/app/interfaces/Reminder";
import React, { useReducer } from "react";
import {
  ReminderStatus,
  ReminderType,
  PriorityType,
} from "../enums/ReminderEnums";

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

const exampleReminders: Reminder[] = [
  {
    id: 1,
    title: "Team Meeting",
    description: "Discuss project updates and next steps.",
    dueDate: "2025-05-10",
    dueTime: "10:00 AM",
    status: ReminderStatus.Pending,
    reminderType: ReminderType.Work,
    priority: PriorityType.High,
  },
  {
    id: 2,
    title: "Doctor's Appointment",
    description: "Annual health check-up.",
    dueDate: "2025-05-12",
    dueTime: "3:00 PM",
    status: ReminderStatus.Pending,
    reminderType: ReminderType.Personal,
    priority: PriorityType.Medium,
  },
  {
    id: 3,
    title: "Submit Tax Documents",
    description: "Submit all required tax documents before the deadline.",
    dueDate: "2025-05-15",
    status: ReminderStatus.Pending,
    reminderType: ReminderType.Work,
    priority: PriorityType.High,
  },
  {
    id: 4,
    title: "Buy Groceries",
    description: "Milk, eggs, bread, and vegetables.",
    dueDate: "2025-05-08",
    status: ReminderStatus.Completed,
    reminderType: ReminderType.Personal,
    priority: PriorityType.Low,
  },
  {
    id: 5,
    title: "Place online order",
    description: "Catch up with May sale event.",
    dueDate: "2025-05-09",
    status: ReminderStatus.Pending,
    reminderType: ReminderType.Personal,
    priority: PriorityType.Medium,
  },
];

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
  const [tasks, dispatch] = useReducer(reminderReducer, exampleReminders);

  return (
    <ReminderContext.Provider value={tasks}>
      <ReminderDispatchContext.Provider value={dispatch}>
        {children}
      </ReminderDispatchContext.Provider>
    </ReminderContext.Provider>
  );
}
