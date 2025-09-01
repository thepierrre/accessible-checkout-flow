"use client";

import {ReactNode, useEffect, useLayoutEffect, useId, useRef} from "react";
import {createPortal} from "react-dom";

interface Props {
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
}

export default function Modal({children, isOpen, onClose, title, description}: Props) {
    const id = useId();
    const modalRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const modalElement = modalRef.current;
        if (!isOpen || modalElement === null) return;

        const tabbableElements = Array.from(modalElement.querySelectorAll<HTMLElement>(
            "a[href], button, input, textarea, select, [tabindex]:not([tabindex='-1'])"))
            .filter((el) => !el.hasAttribute("disabled"));


        if (tabbableElements.length === 0) {
            modalElement.focus();
        }

        const firstElement = tabbableElements[0];
        const lastElement = tabbableElements[tabbableElements.length - 1];

        firstElement.focus();


        function handleTabKeyPress(e: KeyboardEvent) {
            if (modalElement === null || e.key !== "Tab") return;


            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
            if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault()
                firstElement.focus();
            }


        }

        function handleEscapeKeyPress(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleTabKeyPress);
            document.addEventListener("keydown", handleEscapeKeyPress);
        }

        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleTabKeyPress);
            document.removeEventListener("keydown", handleEscapeKeyPress);
            document.body.style.overflow = "";
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div onClick={onClose}
             className="fixed inset-0 z-100 flex items-center justify-center bg-black-primary/50 shadow-2xl">
            <div
                tabIndex={-1}
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${id}-title`}
                aria-describedby={`${id}-description`}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg w-full h-full max-w-md max-h-28 p-4 relative">
                <div className="flex flex-col gap-3 items-center">
                    <h2 id={`${id}-title`} className="text-2xl text-blue-primary font-medium">{title}</h2>
                    <p id={`${id}-description`}>{description}</p>
                </div>
                {children}
                <button aria-label="Close modal" onClick={onClose} className="absolute top-0 right-2 m-1">✕</button>
            </div>

        </div>, document.body);
}