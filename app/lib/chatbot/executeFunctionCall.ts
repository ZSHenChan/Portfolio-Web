import { FunctionCall } from "@google/genai";
import { sendEmail } from "@/app/api/sendEmail";
import { templateParams } from "@/app/interfaces/templateParams";
import { addReminders } from "@/app/api/reminderApi";
import { Reminder } from "@/app/interfaces/Reminder";
import { reportErrorMessage } from "@/app/utils/handleErrorMsg";
import toast from "react-hot-toast";
import {
  PriorityType,
  ReminderStatus,
  ReminderType,
} from "@/app/enums/ReminderEnums";

const executeFunctionCall = async (
  functionCall: FunctionCall | undefined,
  scrollToSection: (section: string) => void | null,
  setOpen: (open: boolean) => void
) => {
  if (functionCall) {
    const functionName = functionCall.name;
    const functionArguments = functionCall.args;
    // console.log(`executing function call: ${functionName}`);

    switch (functionName) {
      case "addNewReminder":
        const newReminder = {
          title: functionArguments?.title || "No title",
          dueDate: functionArguments?.dueDate || "2020-10-01",
          description: functionArguments?.description || "",
          status: ReminderStatus.Pending,
          reminderType: functionArguments?.reminderType || ReminderType.Work,
          priority: PriorityType.Low,
        } as Reminder;
        console.log(newReminder);
        const response = await addReminders(newReminder);
        if (response.error) {
          reportErrorMessage(response.message);
        } else {
          toast.success("Reminder added successfully");
        }
        return;
      case "navigateSection":
        // console.log(functionArguments?.section);
        setTimeout(() => setOpen(false), 300);
        setTimeout(
          () => scrollToSection(functionArguments?.section as string),
          500
        );
        return;
      case "navigateProjects":
        // console.log(`Scroll to : ${functionArguments?.section}`);
        setTimeout(() => setOpen(false), 300);
        setTimeout(
          () => scrollToSection(functionArguments?.project as string),
          500
        );
        return;
      case "sendEmail":
        console.log(functionArguments);
        const params = {
          name: functionArguments?.name,
          email: functionArguments?.email,
          title: functionArguments?.title,
          content: functionArguments?.description,
        } as templateParams;
        sendEmail(params);
        return;
      default:
        console.error("Unknown function call:", functionName);
        return;
    }
  }
  return;
};

export { executeFunctionCall };
