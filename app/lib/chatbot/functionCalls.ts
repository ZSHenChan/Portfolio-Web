import { FunctionDeclaration, Type } from "@google/genai";

export const functionCallDict = new Map<string, string>();
functionCallDict.set(
  "navigateSection",
  "The user is about to see the content themselves. Do not provide information about the contents in the section."
);
functionCallDict.set(
  "sendEmail",
  "Notify the user that is email is about to be sent."
);
functionCallDict.set(
  "navigateProjects",
  "The user is about to see the project themselves. Do not provide information about the project."
);
functionCallDict.set(
  "addNewReminder",
  "Notify that a new reminder for Zi Shen is added to the list. No additional information is needed."
);

const addNewReminderDeclaration: FunctionDeclaration = {
  name: "addNewReminder",
  parameters: {
    type: Type.OBJECT,
    description: "Adding a new reminder for Zi Shen.",
    properties: {
      title: {
        type: Type.STRING,
        description:
          "The title for the reminder. Keep this as short as possible, and use the rest details as description.",
      },
      dueDate: {
        type: Type.STRING,
        description:
          "The due date for the new reminder. Must be in YYYY-MM-DD format. Optional",
      },
      description: {
        type: Type.STRING,
        description: "The description for the reminder. Optional",
      },
      reminderType: {
        type: Type.STRING,
        description:
          "The reminder type. Select from the options based on the conversation history.",
        enum: ["Work", "Personal"],
      },
    },
    required: ["title", "reminderType"],
  },
};

const navigateSectionDeclaration: FunctionDeclaration = {
  name: "navigateSection",
  parameters: {
    type: Type.OBJECT,
    description:
      "navigate to a section of the website. Only return function when keyword navigate is detected.",
    properties: {
      section: {
        type: Type.STRING,
        description: "The target section to navigate to.",
        enum: ["contact", "hero", "techstack", "projects"],
      },
    },
    required: ["section"],
  },
};

const navigateProjectsDeclaration: FunctionDeclaration = {
  name: "navigateProjects",
  parameters: {
    type: Type.OBJECT,
    description: "navigate user to a specific project.",
    properties: {
      project: {
        type: Type.STRING,
        description:
          "The target project to navigate to. Do not return anything if the user does not specify which project.",
        enum: ["xcuisite", "sccc", "personal-assistant", "automation-manager"],
      },
    },
    required: ["project"],
  },
};

const sendEmailDeclaration: FunctionDeclaration = {
  name: "sendEmail",
  parameters: {
    type: Type.OBJECT,
    description: "Help the user to send an email to zi shen.",
    properties: {
      email: {
        type: Type.STRING,
        description: "user email. This field cannot be empty",
      },
      name: {
        type: Type.STRING,
        description: "user name. This field cannot be empty.",
      },
      title: {
        type: Type.STRING,
        description:
          "email title. Write a short title for the email, summarize the content if no title is given",
      },
      description: {
        type: Type.STRING,
        description:
          "email description. This is the message that will be sent to zi shen. If no description is given, write a short message to zi shen based on the conversation history.",
      },
    },
    required: ["name", "email", "title"],
  },
};

export {
  sendEmailDeclaration,
  navigateProjectsDeclaration,
  navigateSectionDeclaration,
  addNewReminderDeclaration,
};
