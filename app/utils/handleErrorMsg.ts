import toast from "react-hot-toast";

export const getErrorMessage = (err: unknown): string => {
  let message;
  if (err instanceof Error) message = err.message;
  else message = String(err);
  return message;
};

export const reportErrorMessage = (
  toastMessage: string,
  errorMessage?: string
) => {
  if (!errorMessage) console.error(errorMessage);
  toast.error(toastMessage);
};

export const reportSuccess = (message: string) => {
  toast.success(message);
};
