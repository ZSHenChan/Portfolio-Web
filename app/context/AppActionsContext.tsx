import React, { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Reminder } from "../interfaces/Reminder";
import { Email } from "../interfaces/Email";
import { addReminders } from "../api/reminderApi";
import { reportErrorMessage, reportSuccess } from "../utils/handleReport";
import { sendEmail } from "../api/sendEmail";

interface AppActionsContextProps {
  router: ReturnType<typeof useRouter> | null;
  reminderCounter: number;
  addReminderAction: (reminder: Reminder) => Promise<void>;
  sendEmailAction: (email: Email) => void;
}

const AppActionsContext = createContext<AppActionsContextProps | undefined>(
  undefined
);

export const AppActionsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const [reminderCounter, setReminderCounter] = useState(0);

  // - Implement Actions
  const addReminderAction: (reminder: Reminder) => Promise<void> = useCallback(
    async (reminder: Reminder) => {
      const response = await addReminders(reminder);
      if (response.error) {
        reportErrorMessage(response.message);
      } else {
        setReminderCounter((prev) => prev + 1);
        reportSuccess("Reminder added successfully");
      }
    },
    []
  );

  const sendEmailAction: (email: Email) => void = useCallback((email) => {
    sendEmail(email);
  }, []);

  const AppActionsContextValue: AppActionsContextProps = {
    router,
    reminderCounter,
    addReminderAction,
    sendEmailAction,
  };

  return (
    <AppActionsContext.Provider value={AppActionsContextValue}>
      {children}
    </AppActionsContext.Provider>
  );
};

export const useAppActions = () => {
  const context = useContext(AppActionsContext);
  if (context == undefined) {
    throw new Error("useUIState must be used within AppActionsContextProvider");
  }
  return context;
};
