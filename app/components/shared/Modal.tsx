"use client";

import {ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";

interface Props {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({children, isOpen, onClose}: Props) {
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", onKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div onClick={onClose}
             className="fixed inset-0 z-100 flex items-center justify-center bg-black-primary/50 shadow-2xl">
            <div onClick={(e) => e.stopPropagation()}
                 className="bg-white rounded-lg w-full h-full max-w-md max-h-28 p-4 relative">
                {children}
                <button onClick={onClose} className="absolute top-0 right-2 m-1">✕</button>
            </div>

        </div>, document.body);
}