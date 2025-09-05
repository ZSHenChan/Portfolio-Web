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
  delay: number = 2000,
  timeout: number = 5000
): Promise<fetchWithRetryResponse> => {
  // Added explicit return type promise
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, {
        ...requestInit,
        signal: controller.signal,
      });

      clearTimeout(id);

      // Success path
      if (response && response.ok) {
        try {
          const resJson = await response.json();
          return { response: resJson, errMsg: null };
        } catch {
          return { response: null, errMsg: "Failed to parse JSON response." };
        }
      }

      if (response.status >= 400 && response.status < 500) {
        console.error(`Client Error: ${response.status}. Not retrying.`);
        return {
          response: null,
          errMsg: `Bad Request: ${response.statusText}`,
        };
      }

      if (response.status >= 500 && response.status < 600) {
        lastError = new Error(
          `Server Error: ${response.status} ${response.statusText}`
        );
        console.log(
          `Attempt ${attempt + 1} failed: ${getErrorMessage(lastError)}`
        );

        if (attempt < maxRetries - 1) {
          console.log(`Retrying in ${delay / 1000}s...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } else {
        // Handle other non-ok status codes, like 3xx redirects (though fetch usually handles these)
        // or a new class of errors. For simplicity, we can treat them as non-retriable.
        console.error(
          `Unexpected HTTP Status: ${response.status}. Not retrying.`
        );
        return {
          response: null,
          errMsg: `Unexpected Status: ${response.statusText}`,
        };
      }
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
