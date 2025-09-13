import { type RefObject, useEffect, useState } from "react";

export function usePopupStyle(
  ref: RefObject<HTMLElement | null>,
  width: number,
) {
  const [style, setStyle] = useState({ top: 0, width: 0 });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setStyle({ top: rect.height, width });
    }
  }, [ref, width]);

  return style;
}
