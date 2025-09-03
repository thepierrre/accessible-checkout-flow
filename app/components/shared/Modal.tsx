"use client";

import { type ReactNode, useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

export default function Modal({
  children,
  isOpen,
  onClose,
  title,
  description,
}: Props) {
  const id = useId();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const modalElement = modalRef.current;
    if (!isOpen || modalElement === null) return;

    const tabbableElements = Array.from(
      modalElement.querySelectorAll<HTMLElement>(
        "a[href], button, input, textarea, select, [tabindex]:not([tabindex='-1'])",
      ),
    ).filter((el) => !el.hasAttribute("disabled"));

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
        e.preventDefault();
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
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-primary/50 shadow-2xl"
    >
      <div
        tabIndex={-1}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        className="relative h-full max-h-28 w-full max-w-md rounded-lg bg-white p-4"
      >
        <div className="flex flex-col items-center gap-3">
          <h2
            id={`${id}-title`}
            className="font-semibold text-2xl text-blue-primary"
          >
            {title}
          </h2>
          <p id={`${id}-description`} className="text-gray-600">
            {description}
          </p>
        </div>
        {children}
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-200 hover:bg-gray-100 hover:text-gray-700"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>
    </div>,
    document.body,
  );
}
