"use client";

import clsx from "clsx";
import { type FormEvent, useId, useState } from "react";
import Modal from "@/app/components/shared/Modal";
import Button from "@/app/components/shared/Button";

const EMAIL = "piotr@example.com";

type FormErrors = {
  email?: string;
  question?: string;
};

export default function OrderCompletePage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const questionTextareaId = useId();
  const emailInputId = useId();
  const formId = useId();

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
      return;
    }

    setIsFormOpen(false);
    setSuccessMessage(
      "Thank you for your message. We will get back to you soon.",
    );

    setTimeout(() => {
      setIsFadingOut(true);
    }, 2500);

    setTimeout(() => {
      setSuccessMessage("");
      setIsFadingOut(false);
    }, 3000);
  }

  return (
    <main className="mx-auto my-12 max-w-lg space-y-8 rounded-xl bg-gradient-to-br from-white to-gray-50 px-10 py-8 shadow-md">
      <div className="space-y-4 text-center">
        <h1 className="relative mb-4 inline-block font-bold text-3xl uppercase tracking-wide">
          <span className="relative z-10 px-8 text-white">
            Thank you, Piotr!
          </span>
          <span className="-skew-x-12 absolute inset-0 bg-blue-primary"></span>
        </h1>
        <div className="flex flex-col gap-1">
          <p>
            Your order has been placed successfully and we&#39;ve sent a
            confirmation to <span className="font-semibold">{EMAIL}</span>.
          </p>
          <p>We&#39;ll let you know as soon as we&#39;ve shipped your order.</p>
        </div>

        <p className="font-semibold">Looking for something else?</p>

        <button
          type="button"
          onClick={() => setIsDemoModalOpen(true)}
          className={clsx(
            "w-30 rounded-md bg-blue-primary px-6 py-2 text-white hover:bg-blue-semidark",
          )}
        >
          Continue shopping
        </button>
      </div>

      <div className="space-y-4 text-center">
        <button
          type="button"
          onClick={() => setIsOrderModalOpen(true)}
          className="font-medium text-blue-primary underline hover:text-blue-semidark"
        >
          View order details
        </button>

        <div>
          <button
            type="button"
            aria-expanded={isFormOpen}
            aria-controls={formId}
            onClick={() => {
              setIsFormOpen((prev) => !prev);
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
            >
              <fieldset className="flex flex-col gap-1">
                <legend className="sr-only">Contact form</legend>
                <label htmlFor={emailInputId} className="block font-medium">
                  Your email*
                </label>
                <input
                  id={emailInputId}
                  name="email"
                  placeholder="max.mustermann@example.com"
                  type="email"
                  defaultValue={EMAIL}
                  aria-required="true"
                  aria-invalid={!!formErrors.email}
                  aria-describedby={
                    formErrors.email
                      ? `${emailInputId}-error-message`
                      : undefined
                  }
                  className={clsx(
                    "h-10 w-full rounded-md border px-2 text-base focus:outline-none focus:ring-1",
                    formErrors.email
                      ? "border-red-primary focus:ring-red-primary"
                      : "border-gray-300 focus:border-blue-primary focus:ring-blue-primary",
                  )}
                />
                <p
                  id={`${questionTextareaId}-error-message`}
                  className={clsx(
                    "overflow-hidden text-red-primary text-sm transition-[max-height] duration-700",
                    formErrors.email ? "max-h-8" : "max-h-0",
                  )}
                >
                  {formErrors.email || ""}
                </p>
              </fieldset>
              <fieldset className="flex flex-col gap-1">
                <label
                  htmlFor={questionTextareaId}
                  className="block font-medium"
                >
                  Your message*
                </label>
                <textarea
                  id={questionTextareaId}
                  name="question"
                  aria-required="true"
                  aria-invalid={!!formErrors.question}
                  aria-describedby={
                    formErrors.email
                      ? `${questionTextareaId}-error-message`
                      : undefined
                  }
                  rows={4}
                  className={clsx(
                    "w-full rounded-md border p-2 text-base focus:outline-none focus:ring-1",
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
              </fieldset>

              <div className="flex justify-center gap-2">
                <Button
                  type="reset"
                  label="Reset"
                  size="small"
                  variant="secondary"
                />
                <Button type="submit" label="Send" size="small" />
              </div>
            </form>
          )}
        </div>
      </div>

      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        title="Order details"
        description="Here’s a summary of your recent order."
      >
        <ul className="space-y-2">{/*<li></li>*/}</ul>
      </Modal>

      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Demo"
        description="This is just a demo. No real shop here."
      />
    </main>
  );
}
