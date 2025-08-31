"use client";

import {ReactNode, useState, KeyboardEvent} from "react";
import {clsx} from "clsx";

type TooltipProps = {
    children: (props: {
                   onMouseEnter: () => void,
                   onMouseLeave: () => void,
                   onFocus: () => void;
                   onBlur: () => void;
                   onKeyDown: (e: KeyboardEvent) => void;
                   "aria-describedby": string
               }
    ) => ReactNode;
    label: string;
    position: "left" | "right";
    id: string;
    delay?: number;
}

export default function Tooltip({children, label, position, id, delay = 300}: TooltipProps) {
    const [isShown, setIsShown] = useState(false);
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    function showTooltip() {
        timeoutId = setTimeout(() => {
            setIsShown(true);
        }, delay)
    }

    function hideTooltip() {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        setIsShown(false)
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key !== "Escape") return;

        e.stopPropagation();
        setIsShown(false);
    }

    return (
        <div
            className="relative">
            <div className="cursor-pointer">
                {children({
                        onMouseEnter: showTooltip,
                        onMouseLeave: hideTooltip,
                        onFocus: showTooltip,
                        onBlur: hideTooltip,
                        onKeyDown: handleKeyDown,
                        "aria-describedby": id
                    }
                )}
            </div>
            {isShown && (
                <div role="tooltip" id={id}
                     className={clsx(position === "right" ? "left-full ml-1.5" : "right-full mr-1.5",
                         "absolute whitespace-nowrap bg-blue-primary  top-1/2 -translate-y-1/2  py-1 px-2 rounded-md text-white")}>
                    <p className="text-xs">{label}</p>
                    <div
                        className={clsx(position === "right" ? "-left-1 border-r-8 border-r-blue-primary" : "-right-1 border-l-8 border-l-blue-primary",
                            "absolute top-1/2 -translate-y-1/2  w-0 h-0 border-y-8 border-y-transparent ")}
                    />
                </div>)}
        </div>)
}