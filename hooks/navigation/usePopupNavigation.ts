import { type KeyboardEvent, useCallback, useEffect, useState } from "react";

interface Props<T> {
  options: T[];
  onSelect: (option: T, index: number) => void;
  onTab: () => void;
  onCancel: () => void;
  isOpen: boolean;
  onOpen: () => void;
}

export default function usePopupNavigation<T>({
  options,
  onSelect,
  onTab,
  onCancel,
  isOpen,
  onOpen,
}: Props<T>) {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (isOpen && activeIndex === -1 && options.length > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, isOpen, options.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (options.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            onOpen();
            setActiveIndex(0);
          } else {
            setActiveIndex((prev) => (prev + 1) % options.length);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex(
            (prev) => (prev - 1 + options.length) % options.length,
          );
          break;
        case "Enter": {
          if (isOpen) {
            e.preventDefault();
            const activeEl = options[activeIndex];
            if (activeEl) {
              onSelect(activeEl, activeIndex);
            }
          }

          break;
        }
        case "Escape":
          e.preventDefault();
          if (!isOpen) return;
          setActiveIndex(-1);
          onCancel();
          break;
        case "Tab":
          onTab();
          setActiveIndex(-1);
          break;
      }
    },
    [activeIndex, isOpen, onCancel, onOpen, onSelect, onTab, options],
  );

  return { activeIndex, setActiveIndex, handleKeyDown };
}
