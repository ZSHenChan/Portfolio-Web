import { useAppActions } from "@/app/context/AppActionsContext";
import { useUIState } from "@/app/context/UIStateContext";
import { Email } from "@/app/interfaces/Email";
import {
  ReminderStatus,
  ReminderType,
  PriorityType,
} from "@/app/enums/ReminderEnums";
import { Reminder } from "@/app/interfaces/Reminder";

const handleNavigation = async (
  args: Record<string, unknown> | undefined,
  appActions: ReturnType<typeof useAppActions>,
  uiState: ReturnType<typeof useUIState>
) => {
  const targetId = (args?.section as string) || (args?.project as string);
  if (!targetId) {
    console.error("Navigation function call missing target section/project ID");
    return;
  }

  if (uiState.scrollTargetList.has(targetId)) {
    if (uiState.setChatOpen) {
      setTimeout(() => uiState.setChatOpen(false), 300);
    }
    setTimeout(() => uiState.scrollToSection(targetId), 500);
  }
};

const handleSendEmail = (
  args: Record<string, unknown> | undefined,
  appActions: ReturnType<typeof useAppActions>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uiState: ReturnType<typeof useUIState>
) => {
  const email = {
    name: args?.name,
    email: args?.email,
    title: args?.title,
    content: args?.description,
  } as Email;
  appActions.sendEmailAction(email);
};

const handleAddReminder = (
  args: Record<string, unknown> | undefined,
  appActions: ReturnType<typeof useAppActions>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uiState: ReturnType<typeof useUIState>
) => {
  const newReminder = {
    title: args?.title || "No title",
    dueDate: args?.dueDate || "2020-10-01",
    description: args?.description || "",
    status: ReminderStatus.Pending,
    reminderType: args?.reminderType || ReminderType.Work,
    priority: PriorityType.Low,
  } as Reminder;

  appActions.addReminderAction(newReminder);
};

export const functionRegistry = {
  "navigateSection": handleNavigation,
  "navigateProjects": handleNavigation,
  "addNewReminder": handleAddReminder,
  "sendEmail": handleSendEmail,
};
