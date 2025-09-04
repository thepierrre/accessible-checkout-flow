"use client";

import clsx from "clsx";
import Button from "@/app/components/shared/Button";
import { type FormEvent, useEffect, useId, useState } from "react";

type FormErrors = {
  email?: string;
  question?: string;
};

interface Props {
  orderEmail: string;
}

export default function ContactForm({ orderEmail }: Props) {
  const questionTextareaId = useId();
  const emailInputId = useId();
  const formHeadingId = useId();
  const formId = useId();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isFormOpen) return;

    function handleEscKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsFormOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscKeyDown);
    return () => document.removeEventListener("keydown", handleEscKeyDown);
  }, [isFormOpen]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setFormErrors({});

    const email = formData.get("email") as string | null;
    const question = formData.get("question") as string | null;

    const formErrors: FormErrors = {};

    if (!email || !email.trim()) {
      formErrors.email = "Please enter an email.";
    } else if (!email.includes("@")) {
      formErrors.email = "Please enter a valid email address.";
    }
    if (!question || !question.trim()) {
      formErrors.question = "Please enter a question.";
    }

    if (Object.keys(formErrors).length > 0) {
      setFormErrors(formErrors);

      if (formErrors.email) {
        document.getElementById(emailInputId)?.focus();
      } else if (formErrors.question) {
        document.getElementById(questionTextareaId)?.focus();
      }

      return;
    }

    setIsFormOpen(false);
    setSuccessMessage(
      "Thank you for your message. We will get back to you soon.",
    );

    setTimeout(() => {
      setIsFadingOut(true);
    }, 4500);

    setTimeout(() => {
      setSuccessMessage("");
      setIsFadingOut(false);
    }, 5000);
  }

  return (
    <div className="space-y-4 text-center">
      <button
        type="button"
        aria-expanded={isFormOpen}
        aria-controls={formId}
        onClick={() => {
          setIsFormOpen((prev) => !prev);
          if (isFormOpen) {
            setFormErrors({});
          }
          setSuccessMessage("");
        }}
        className="font-medium text-blue-primary underline"
      >
        {isFormOpen ? "Hide contact form" : "Need help? Contact us"}
      </button>
      <output
        aria-live="polite"
        className={clsx(
          "flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-opacity duration-500",
          successMessage
            ? isFadingOut
              ? "mt-4 border-green-200 text-green-700 opacity-0"
              : "mt-4 border-green-200 bg-green-50 text-green-700 opacity-100"
            : "border-transparent text-transparent opacity-0",
        )}
      >
        {successMessage || ""}
      </output>
      {isFormOpen && (
        <form
          id={formId}
          className="mt-4 space-y-3 text-left"
          onSubmit={handleSubmit}
          noValidate
          aria-labelledby={formHeadingId}
        >
          <h2 className="sr-only" id={formHeadingId}>
            Contact form
          </h2>
          <div className="flex flex-col gap-1">
            <label htmlFor={emailInputId} className="block font-medium">
              Your email*
            </label>
            <input
              id={emailInputId}
              name="email"
              placeholder="max.mustermann@example.com"
              type="email"
              defaultValue={orderEmail}
              aria-required="true"
              aria-invalid={!!formErrors.email}
              aria-describedby={
                formErrors.email ? `${emailInputId}-error-message` : undefined
              }
              className={clsx(
                "h-10 w-full rounded-lg border px-2 text-base focus:outline-none focus:ring-1",
                formErrors.email
                  ? "border-red-primary focus:ring-red-primary"
                  : "border-gray-300 focus:border-blue-primary focus:ring-blue-primary",
              )}
            />
            <p
              id={`${emailInputId}-error-message`}
              className={clsx(
                "overflow-hidden text-red-primary text-sm transition-[max-height] duration-700",
                formErrors.email ? "max-h-8" : "max-h-0",
              )}
            >
              {formErrors.email || ""}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={questionTextareaId} className="block font-medium">
              Your message*
            </label>
            <textarea
              id={questionTextareaId}
              name="question"
              aria-required="true"
              aria-invalid={!!formErrors.question}
              aria-describedby={
                formErrors.question
                  ? `${questionTextareaId}-error-message`
                  : undefined
              }
              rows={4}
              className={clsx(
                "w-full rounded-lg border p-2 text-base focus:outline-none focus:ring-1",
                formErrors.question
                  ? "border-red-primary focus:ring-red-primary"
                  : "border-gray-300 focus:border-blue-primary focus:ring-blue-primary",
              )}
              placeholder="Enter your message here."
            />
            <p
              id={`${questionTextareaId}-error-message`}
              className={clsx(
                "overflow-hidden text-red-primary text-sm transition-[max-height] duration-700",
                formErrors.question ? "max-h-8" : "max-h-0",
              )}
            >
              {formErrors.question || ""}
            </p>
          </div>

          <div className="flex justify-center">
            <Button type="submit" label="Send" />
          </div>
        </form>
      )}
    </div>
  );
}
