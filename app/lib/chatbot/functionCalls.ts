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
    description: "Navigate user to a specific section of the website.",
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

const sendEmailDeclaration: FunctionDeclaration = {
  name: "sendEmail",
  parameters: {
    type: Type.OBJECT,
    description: "Send an email based on user input.",
    properties: {
      email: {
        type: Type.STRING,
        description: "user email",
      },
      name: {
        type: Type.STRING,
        description: "user name",
      },
      title: {
        type: Type.STRING,
        description: "email title",
      },
    },
    required: ["name", "email", "title"],
  },
};

export {
  controlLightDeclaration,
  sendEmailDeclaration,
  navigateSectionDeclaration,
};
