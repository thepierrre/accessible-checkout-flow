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
    <section className="relative my-6 w-144 text-center">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-gray-300 border-t" />
      </div>
      <span className="relative mx-auto inline-flex items-center gap-2 bg-white px-4 font-medium text-gray-800 text-lg">
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
            <Image tabIndex={0} src={questionIcon} alt="" {...triggerProps} />
          )}
        </Tooltip>
      </span>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Demo"
        description="This is just a demo. No real login or signup here!"
      />
    </section>
  );
}
