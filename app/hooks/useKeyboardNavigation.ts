import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useKeyboardNavigation(
  listLength: number,
): [number, Dispatch<SetStateAction<number>>] {
  const [activeElement, setActiveElement] = useState(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      setActiveElement((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "ArrowDown") {
      setActiveElement((prev) =>
        prev < listLength - 1 ? prev + 1 : listLength - 1,
      );
    }
  };

  useEffect(() => {
    setActiveElement(0);
  }, [listLength]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return [activeElement, setActiveElement];
}
