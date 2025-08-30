"use client";

import {ReactNode, useState, useRef} from "react";
import {clsx} from "clsx";

type TooltipProps = {
    children: ReactNode;
    label: string;
    position: "left" | "right";
    delay?: number;
}

export default function Tooltip({children, label, position, delay = 300}: TooltipProps) {
    const [isShown, setIsShown] = useState(false);
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    function showTooltip() {
        timeoutId = setTimeout(() => {
            setIsShown(true);
        }, delay)
    }

    function hideTooltip() {
        if ( timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        setIsShown(false)
    }

    return (
        <div tabIndex={0}
            onMouseEnter={showTooltip} onMouseLeave={hideTooltip} onFocus={showTooltip} onBlur={hideTooltip} className="relative">
            {children}
            {isShown && (
                <div
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