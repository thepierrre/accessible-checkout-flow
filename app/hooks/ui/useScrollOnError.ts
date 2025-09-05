import { type RefObject, useEffect } from "react";
import type { AppMessageType } from "@/app/context/AppMessageContext";

export default function useScrollOnError(
  errorRef: RefObject<HTMLElement | null>,
  dependencies: AppMessageType[] = [],
) {
  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [errorRef, ...dependencies]);
}
