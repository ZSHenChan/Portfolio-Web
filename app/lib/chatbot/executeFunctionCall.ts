import { FunctionCall } from "@google/genai";
import { sendEmail } from "@/app/api/sendEmail";
import { templateParams } from "@/app/interfaces/templateParams";

const executeFunctionCall = (
  functionCall: FunctionCall | undefined,
  scrollToSection: (section: string) => void | null,
  setOpen: (open: boolean) => void
) => {
  if (functionCall) {
    const functionName = functionCall.name;
    const functionArguments = functionCall.args;
    // console.log(`executing function call: ${functionName}`);

    switch (functionName) {
      case "controlLight":
        return;
      case "navigateSection":
        console.log(functionArguments?.section);
        setTimeout(() => setOpen(false), 300);
        setTimeout(
          () => scrollToSection(functionArguments?.section as string),
          500
        );
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
