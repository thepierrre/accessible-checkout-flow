import { useEffect, type RefObject } from "react";

export function useActiveScroll<T extends HTMLElement>(
  refs: RefObject<(T | null)[]>,
  activeIndex: number,
  isOpen: boolean,
) {
  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      refs.current?.[activeIndex]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [activeIndex, isOpen, refs]);
}
