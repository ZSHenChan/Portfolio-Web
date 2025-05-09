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
  let attempt = 0;
  // console.log(`Attempt ${attempt + 1}`);
  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, requestInit);
      if (!response.ok) {
        throw new Error("No response fetched.");
      }
      const resJson = await response.json();
      return { response: resJson, errMsg: null } as fetchWithRetryResponse;
    } catch (err) {
      attempt++;
      const msg = getErrorMessage(err);
      if (attempt >= maxRetries) {
        return {
          response: null,
          errMsg: `Fetch failed: ${msg}`,
        } as fetchWithRetryResponse;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
