import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,
  client: {
    NEXT_PUBLIC_GEMINI_MODEL_NAME: z.string(),
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: z.string(),
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: z.string(),
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: z.string(),
    NEXT_PUBLIC_LOCAL_REMINDER_API_URL: z.string(),
    NEXT_PUBLIC_AZURE_REMINDER_API_URL: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GEMINI_MODEL_NAME: process.env.NEXT_PUBLIC_GEMINI_MODEL_NAME,
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    NEXT_PUBLIC_LOCAL_REMINDER_API_URL:
      process.env.NEXT_PUBLIC_LOCAL_REMINDER_API_URL,
    NEXT_PUBLIC_AZURE_REMINDER_API_URL:
      process.env.NEXT_PUBLIC_AZURE_REMINDER_API_URL,
  },
});
