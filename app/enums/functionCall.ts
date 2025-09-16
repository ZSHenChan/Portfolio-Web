export const FunctionCallType = {
  NavigateSection: {
    name: "NavigateSection",
    description: `Navigate the user to a specific section of the website. This function should only be triggered when the user confirms a suggestion from the assistant to navigate to a specific section.
Successful example:
[{\"role\": user, \"message\": \"Where can I find Zi Shen's contact info?\"}, {\"role\": bot, \"message\": \"It's nice to meet you, Alex. You can find his contact information on the contact page. I can take you there now if you'd like.\"}, {\"role\": user, \"message\": \"Yes please.\"}]
Failed example:
[{\"role\": user, \"message\": \"Tell me about project stock ai\"}]`,
  },
  SendEmail: {
    name: "SendEmail",
    description:
      "Sends an email to the website administrator. This function should only be called after the bot has gathered the required information: the user's name, their email address, and the title of the email. Email title can be deduced from the conversation without provided by user. Email content is optional and can be deduced from the conversation.",
  },
  NavigateProjects: {
    name: "NavigateProjects",
    description: `Navigate the user to a specific project of the website. This function should only be triggered when the user confirms a suggestion from the bot to navigate to a project.
Successful example:
[{\"role\": user, \"message\": \"What is stock AI project about?\"}, {\"role\": bot, \"message\": \"This project is a CLI for user to do some stock research. Would you like me to navigate to the section for you?\"},{\"role\": user, \"message\": \"Yes please\"}]
Failed example:
[{\"role\": user, \"message\": \"Tell me about your projects\"}]`,
  },
  AddNewReminder: {
    name: "AddNewReminder",
    description: "Add a new reminder for Zi Shen",
  },
  ShowProjectDemo: {
    name: "ShowProjectDemo",
    description:
      "Show user the demo of a specific project. This function should only be called when the user accepting the assistant's offer to bring the visitor to see the demo.",
  },
} as const;

export type FunctionCallTypeName =
  (typeof FunctionCallType)[keyof typeof FunctionCallType]["name"];
