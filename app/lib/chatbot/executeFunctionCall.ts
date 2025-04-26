import { FunctionCall } from "@google/genai";
import { functionRegistry } from "./functionHandlers";
import { useAppActions } from "@/app/context/AppActionsContext";
import { useUIState } from "@/app/context/UIStateContext";
import {
  getErrorMessage,
  reportErrorMessage,
} from "@/app/utils/handleErrorMsg";

const executeFunctionCall = (
  functionCall: FunctionCall | undefined,
  appActions: ReturnType<typeof useAppActions>,
  uiState: ReturnType<typeof useUIState>
) => {
  const functionName = functionCall?.name;
  const functionArgs = functionCall?.args;

  const handler =
    functionRegistry[functionName as keyof typeof functionRegistry];

  if (handler) {
    try {
      handler(functionArgs, appActions, uiState);
    } catch (err) {
      const errMsg = getErrorMessage(err);
      reportError(errMsg);
    }
  } else {
    reportErrorMessage("Unknown Function Called");
    console.error(handler);
  }
};

export { executeFunctionCall };
