import { FunctionDeclaration, Type } from "@google/genai";
import { FunctionCallType } from "@/app/enums/functionCall";

export const functionCallDict = new Map<string, string>();
functionCallDict.set(
  FunctionCallType.NavigateSection,
  "The user is about to see the content themselves. Do not provide information about the contents in the section."
);
functionCallDict.set(
  FunctionCallType.SendEmail,
  "Notify the user that is email is about to be sent."
);
functionCallDict.set(
  FunctionCallType.NavigateProjects,
  "The user is about to see the project themselves. Do not provide information about the project."
);
functionCallDict.set(
  FunctionCallType.AddNewReminder,
  "Notify that a new reminder for Zi Shen is added to the list. No additional information is needed."
);
functionCallDict.set(
  FunctionCallType.ShowProjectDemo,
  "Notify the user a new tab will be open for the project demo."
);

const addNewReminderDeclaration: FunctionDeclaration = {
  name: FunctionCallType.AddNewReminder,
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
          "The due date for the new reminder. Must be either undefined or in YYYY-MM-DD format.",
      },
      time: {
        type: Type.STRING,
        description:
          "The due time for the new reminder. Must be in undefined or in hh:mm:ss format. return undefined if user did not suggest. CANNOT exist without due date.",
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
    required: ["title", "dueDate", "reminderType"],
  },
};

const navigateSectionDeclaration: FunctionDeclaration = {
  name: FunctionCallType.NavigateSection,
  parameters: {
    type: Type.OBJECT,
    description:
      "navigate to a section of the website. This function should only be triggered when the user explicitly asks to be taken to a specific page or section, or confirms a suggestion from the assistant to navigate to a page. Examples of user requests include 'bring me to the contact section' or 'show me your internship experiences.' Confirmation from the user must be direct and intentional.",
    properties: {
      section: {
        type: Type.STRING,
        description: "The target section to navigate to.",
        enum: ["contact", "hero", "techstack", "about"],
      },
    },
    required: ["section"],
  },
};

const navigateProjectsDeclaration: FunctionDeclaration = {
  name: FunctionCallType.NavigateProjects,
  parameters: {
    type: Type.OBJECT,
    description:
      "Navigates the user to a specific section of the website. This function should only be triggered when the user explicitly asks to be taken to a specific page or section, or confirms a suggestion from the assistant to navigate to a page. Examples of user requests include 'bring me to the projects section' or 'show me your project xxx.' Confirmation from the user must be direct and intentional.",
    properties: {
      project: {
        type: Type.STRING,
        description:
          "The target project to navigate to. the first option 'projects' is the project grid where all the projects will be displayed.",
        enum: [
          "projects",
          "reminder-api",
          "xcuisite",
          "sccc",
          "hologram",
          "personal-assistant",
          "automation-manager",
          "stock-ai",
          "event-capture",
        ],
      },
    },
    required: ["project"],
  },
};

const sendEmailDeclaration: FunctionDeclaration = {
  name: FunctionCallType.SendEmail,
  parameters: {
    type: Type.OBJECT,
    description:
      "Sends a contact email to the website administrator on behalf of the user. This function should only be called when the user explicitly requests to send a message, and after the assistant has gathered the required information: the user's name, their email address, and the title of the email. The email content can be extracted from the conversation but is optional.",
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

const showProjectDemo: FunctionDeclaration = {
  name: FunctionCallType.ShowProjectDemo,
  parameters: {
    type: Type.OBJECT,
    description: "Show user the demo of a specific project.",
    properties: {
      name: {
        type: Type.STRING,
        description: "The name of project to show user.",
        enum: ["reminder-api", "xcuisite", "personal-assistant"],
      },
    },
    required: ["name"],
  },
};

export const functionCallList = [
  sendEmailDeclaration,
  navigateProjectsDeclaration,
  navigateSectionDeclaration,
  addNewReminderDeclaration,
  showProjectDemo,
];
