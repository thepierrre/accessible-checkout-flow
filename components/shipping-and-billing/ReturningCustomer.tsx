"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "@/components/shared/Modal";
import questionIcon from "../../public/icons/questionIcon.svg";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipProvider } from "@/shadcn-components/ui/Tooltip";

export function ReturningCustomer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <aside className="relative mb-4 w-full text-center sm:my-2 sm:w-160">
      <div className="hidden sm:absolute sm:inset-0 sm:flex sm:items-center">
        <span className="w-full border-gray-300 border-t" />
      </div>
      <span className="relative mx-auto inline-flex items-center gap-1 bg-white px-4 text-gray-800 text-md sm:gap-2">
        <span className="font-medium">Returning customer?</span>
        <button
          type="button"
          className="focus-primary text-blue-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Log in
        </button>
        <span>or</span>
        <button
          type="button"
          className="focus-primary text-blue-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Sign up
        </button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="hidden sm:block">
              <Image
                tabIndex={0}
                src={questionIcon}
                alt=""
                className="pointer-events-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-primary"
              />
            </TooltipTrigger>
            <TooltipContent className="fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-tooltip-content-transform-origin] animate-in overflow-hidden rounded-md bg-blue-primary px-3 py-1.5 text-white text-xs data-[state=closed]:animate-out">
              Log in to track your purchase history.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Demo"
        description="This is just a checkout flow demo. No real login or signup here."
      />
    </aside>
  );
}
