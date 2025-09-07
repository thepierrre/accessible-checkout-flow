"use client";

import { clsx } from "clsx";
import {
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";

type Props = {
  children: (props: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
    onKeyDown: (e: KeyboardEvent) => void;
    onClick: (e: MouseEvent) => void;
    "aria-describedby": string;
  }) => ReactNode;
  delay?: number;
  id: string;
  label: string;
  position: "left" | "right" | "bottom";
};

export default function Tooltip({
  children,
  label,
  position,
  id,
  delay = 300,
}: Props) {
  const [isShown, setIsShown] = useState(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showTooltip(autoHide = false, delay: number) {
    if (timeoutId.current) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      setIsShown(true);

      if (autoHide) {
        timeoutId.current = setTimeout(() => {
          setIsShown(false);
        }, 2000);
      }
    }, delay);
  }

  function hideTooltip() {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    setIsShown(false);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== "Escape") return;

    e.stopPropagation();
    setIsShown(false);
  }

  function handleClick() {
    showTooltip(true, 0);
  }

  return (
    <div className="relative hidden items-center sm:block">
      <div className="cursor-pointer">
        {children({
          onMouseEnter: () => showTooltip(false, delay),
          onMouseLeave: hideTooltip,
          onFocus: () => showTooltip(false, delay),
          onBlur: hideTooltip,
          onKeyDown: handleKeyDown,
          onClick: handleClick,
          "aria-describedby": id,
        })}
      </div>
      {isShown && (
        <div
          role="tooltip"
          id={id}
          className={clsx(
            position === "right" ? "left-full ml-1.5" : "right-full mr-1.5",
            "-translate-y-1/2 absolute top-1/2 whitespace-nowrap rounded-md bg-blue-primary px-2 py-1 text-white",
          )}
        >
          <p className="text-xs">{label}</p>
          <div
            className={clsx(
              position === "right"
                ? "-left-1 border-r-8 border-r-blue-primary"
                : "-right-1 border-l-8 border-l-blue-primary",
              "-translate-y-1/2 absolute top-1/2 h-0 w-0 border-y-8 border-y-transparent",
            )}
          />
        </div>
      )}
    </div>
  );
}
