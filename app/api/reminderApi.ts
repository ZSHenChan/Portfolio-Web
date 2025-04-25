"use server";

import { env } from "../env/client";
import { envServer } from "../env/server";
import { Reminder } from "@/app/interfaces/Reminder";
import {
  ReminderStatus,
  ReminderType,
  PriorityType,
} from "@/app/enums/ReminderEnums";
import {
  getErrorMessage,
  reportErrorMessage,
} from "@/app/utils/handleErrorMsg";

const BASE_URL = env.NEXT_PUBLIC_REMINDER_API_URL;
const REMINDER_URL = `${BASE_URL}/reminder`;

interface GetRemindersResponse {
  error: boolean;
  message: string;
  reminders: Reminder[];
}

export interface AddReminderResponse {
  error: boolean;
  message: string;
}

export interface QueryObject {
  Title?: string;
  Description?: string;
  Status?: ReminderStatus;
  Type?: ReminderType;
}

async function deleteReminder(id: number) {
  const token = envServer.REMINDER_API_TOKEN;
  try {
    const response = await fetch(`${REMINDER_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(response.json());
      return {
        error: true,
        message: "Unable to delete reminder",
      };
    }

    return {
      error: false,
      message: "Reminder deleted successfully",
    };
  } catch (err) {
    const message = getErrorMessage(err);
    reportErrorMessage(message);
    return {
      error: true,
      message: "Unable to delete reminder",
    };
  }
}

async function addReminders(reminder: Reminder): Promise<AddReminderResponse> {
  const token = envServer.REMINDER_API_TOKEN;
  console.log(token);

  try {
    const response = await fetch(`${REMINDER_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify([reminder]),
    });

    const responseJson = await response.json();

    console.log(`Response: ${responseJson}`);

    if (!response.ok) {
      const errorMessage = Object.values(responseJson.errors).join(",\n");
      console.error(errorMessage);
      return {
        error: true,
        message: "Unable to add reminder",
      };
    }

    return {
      error: false,
      message: "Reminder added successfully",
    };
  } catch (err) {
    const message = getErrorMessage(err);
    console.error(message);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
}

async function fetchReminders(
  queryObject: QueryObject
): Promise<GetRemindersResponse> {
  const token = envServer.REMINDER_API_TOKEN;

  const queryString = Object.entries(queryObject)
    .map(([key, val]) => `${key}=${String(val)}`)
    .join("&");

  try {
    const response = await fetch(`${REMINDER_URL}/all?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        error: true,
        message: "Could not fetch reminders",
        reminders: [],
      };
    }
    const data = await response.json();
    const result: Reminder[] = data.map((reminder: Reminder) => ({
      ...reminder,
      reminderType:
        ReminderType[reminder.reminderType as keyof typeof ReminderType],
      status: ReminderStatus[reminder.status as keyof typeof ReminderStatus],
      priority: PriorityType[reminder.priority as keyof typeof PriorityType],
    }));

    return {
      error: false,
      message: "Fetched reminders successfully",
      reminders: result,
    };
  } catch (err) {
    const message = getErrorMessage(err);
    reportErrorMessage(message);
    return {
      error: true,
      message: "Something went wrong",
      reminders: [],
    };
  }
}

export { fetchReminders, deleteReminder, addReminders };
