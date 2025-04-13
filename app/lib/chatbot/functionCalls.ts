import { FunctionDeclaration, Type } from "@google/genai";

const controlLightDeclaration: FunctionDeclaration = {
  name: "controlLight",
  parameters: {
    type: Type.OBJECT,
    description: "Set the brightness and color temperature of a room light.",
    properties: {
      brightness: {
        type: Type.NUMBER,
        description:
          "Light level from 0 to 100. Zero is off and 100 is full brightness.",
      },
      colorTemperature: {
        type: Type.STRING,
        description:
          "Color temperature of the light fixture which can be `daylight`, `cool`, or `warm`.",
      },
    },
    required: ["brightness", "colorTemperature"],
  },
};

const navigateSectionDeclaration: FunctionDeclaration = {
  name: "navigateSection",
  parameters: {
    type: Type.OBJECT,
    description: "navigate to a section of the website.",
    properties: {
      section: {
        type: Type.STRING,
        description: "The target section to navigate to.",
        enum: ["projects", "contact"],
      },
    },
    required: [],
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
          "email description. This is the message that will be sent to zi shen. If no description is given, write a short message to zi shen.",
      },
    },
    required: ["name", "email"],
  },
};

export {
  controlLightDeclaration,
  sendEmailDeclaration,
  navigateSectionDeclaration,
};
