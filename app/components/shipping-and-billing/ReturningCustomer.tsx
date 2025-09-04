"use client";

import Image from "next/image";
import { useId, useState } from "react";
import Modal from "@/app/components/shared/Modal";
import Tooltip from "@/app/components/shared/Tooltip";
import questionIcon from "../../../public/icons/questionIcon.svg";

export function ReturningCustomer() {
  const tooltipId = useId();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative mb-4 w-full text-center sm:my-2 sm:w-160">
      <div className="hidden sm:absolute sm:inset-0 sm:flex sm:items-center">
        <span className="w-full border-gray-300 border-t" />
      </div>
      <span className="relative mx-auto inline-flex items-center gap-1 bg-white px-4 font-medium text-gray-800 text-md sm:gap-2">
        Returning customer?
        <button
          type="button"
          className="font-medium text-blue-primary focus:outline-blue-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Log in
        </button>
        <span>or</span>
        <button
          type="button"
          className="font-medium text-blue-primary focus:outline-blue-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Sign up
        </button>
        <Tooltip
          label="Log in to track your purchase history."
          position="right"
          id={tooltipId}
        >
          {(triggerProps) => (
            <Image
              tabIndex={0}
              src={questionIcon}
              alt=""
              {...triggerProps}
              className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-primary"
            />
          )}
        </Tooltip>
      </span>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Demo"
        description="This is just a checkout flow demo. No real login or signup here."
      />
    </section>
  );
}
