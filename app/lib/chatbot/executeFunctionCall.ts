import { FunctionCall } from "@google/genai";
import { sendEmail } from "@/app/api/sendEmail";
import { templateParams } from "@/app/interfaces/templateParams";

const executeFunctionCall = (functionCalls: FunctionCall[] | undefined) => {
  if (functionCalls && functionCalls.length > 0) {
    const functionCall = functionCalls[0];
    const functionName = functionCall.name;
    const functionArguments = functionCall.args;

    switch (functionName) {
      case "controlLight":
        return;
      case "navigateSection":
        return;
      case "sendEmail":
        const params = {
          name: functionArguments?.name,
          email: functionArguments?.email,
          title: functionArguments?.title,
          description: functionArguments?.description,
        } as templateParams;
        sendEmail(params);
        return;
      default:
        console.error("Unknown function call:", functionName);
        return null;
    }
  }
};

export { executeFunctionCall };
