// file: fetchWithRetry.ts

import { getErrorMessage } from "./handleReport";

export interface fetchWithRetryResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any | null;
  errMsg: string | null;
}

export const fetchWithRetry = async (
  url: string,
  requestInit: RequestInit | undefined = undefined,
  maxRetries: number = 3,
  delay: number = 2000
): Promise<fetchWithRetryResponse> => {
  // Added explicit return type promise
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, requestInit);

      // Success path
      if (response.ok) {
        try {
          const resJson = await response.json();
          return { response: resJson, errMsg: null };
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (jsonErr) {
          throw new Error(`Failed to parse JSON: ${await response.text()}`);
        }
      }

      if (response.status >= 400 && response.status < 500) {
        console.error(`Client Error: ${response.status}. Not retrying.`);
        return {
          response: null,
          errMsg: `Bad Request: ${response.statusText}`,
        };
      }

      throw new Error(
        `Server Error: ${response.status} ${response.statusText}`
      );
    } catch (err) {
      lastError = err as Error;
      console.log(
        `Attempt ${attempt + 1} failed: ${getErrorMessage(lastError)}`
      );
      if (attempt < maxRetries - 1) {
        console.log(`Retrying in ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // This part is now outside the loop. It will only be reached if all retries fail.
  console.error(`Failed to fetch after ${maxRetries} attempts`);
  return {
    response: null,
    errMsg: `Fetch failed: ${getErrorMessage(lastError)}`,
  };
};
