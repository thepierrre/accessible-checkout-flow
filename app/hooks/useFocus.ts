import { useEffect, useRef } from "react";

export default function useFocus(isActive: boolean) {
  const elementRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (isActive && elementRef.current) {
      elementRef.current.focus();
      console.log(elementRef.current);
    }
  }, [isActive]);

  return elementRef;
}
