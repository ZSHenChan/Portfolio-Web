import { RefObject, useCallback } from "react";

export function useScrollToBottom(ref: RefObject<HTMLDivElement>) {
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [ref]);

  return scrollToBottom;
}
