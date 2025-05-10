import { RequestInit } from "next/dist/server/web/spec-extension/request";
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
  delay: number = 1000
) => {
  let lastError: Error | null = null;
  // console.log(`Attempt ${attempt + 1}`);
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, requestInit);
      if (!response.ok) {
        console.error(response);
        if (response.status == 400 || response.status == 401) {
          console.error(response);
          return {
            response: null,
            errMsg: `Bad Request`,
          };
        }
        throw new Error("No response fetched.");
      }
      const resJson = await response.json();
      return { response: resJson, errMsg: null } as fetchWithRetryResponse;
    } catch (err) {
      lastError = err as Error;
      const errorMsg = getErrorMessage(lastError);
      if (attempt === maxRetries - 1) {
        console.error(`Failed to fetch after ${maxRetries} attempts`);
        return {
          response: null,
          errMsg: `Fetch failed: ${errorMsg}`,
        } as fetchWithRetryResponse;
      }
      console.log(`Retrying in ${delay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
