import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const envServer = createEnv({
  emptyStringAsUndefined: true,
  server: { GOOGLE_CONSOLE_API_KEY: z.string(), GEMINI_API_KEY: z.string() },
  experimental__runtimeEnv: {
    GOOGLE_CONSOLE_API_KEY: process.env.GOOGLE_CONSOLE_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});
