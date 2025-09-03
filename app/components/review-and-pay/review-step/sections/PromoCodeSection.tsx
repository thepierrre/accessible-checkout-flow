"use client";

import Image from "next/image";
import { useState } from "react";
import PromoCodeForm from "@/app/components/review-and-pay/review-step/PromoCodeForm";
import Heading from "@/app/components/shared/Heading";
import { useOrderSummary } from "@/app/context/OrderSummaryContext";
import collapseIcon from "@/public/icons/collapseIcon.svg";
import expandIcon from "@/public/icons/expandIcon.svg";

export default function PromoCodeSection() {
  const { discount } = useOrderSummary();
  const [isAddingCode, setIsAddingCode] = useState(false);

  function handleCollapseOrExpand() {
    setIsAddingCode(!isAddingCode);
  }

  function handleCodeIconDisplay() {
    if (isAddingCode) {
      return collapseIcon;
    } else {
      return expandIcon;
    }
  }

  return (
    <section className="flex flex-col">
      <div className="flex border-gray-primary border-b pb-2">
        <div className="mb-2 flex grow gap-2">
          <Heading label="Promo code" as="h2" />
        </div>
        {/*TODO examine*/}
        {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
        <div className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-blue-extralight px-3 font-medium text-blue-primary text-sm transition-colors duration-200 hover:bg-blue-light">
          {/*TODO examine*/}
          {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <p onClick={handleCollapseOrExpand}>
            {!isAddingCode ? (!discount ? "Add code" : "Expand") : "Collapse"}
          </p>
          <Image
            src={handleCodeIconDisplay()}
            alt="Add code icon"
            className="w-4 h-4"
          />
        </div>
      </div>

      {isAddingCode && <PromoCodeForm />}
      {discount !== 0 && (
        <p className="mt-1 ml-4 font-medium text-sm text-teal-500">
          {discount}% discount applied!
        </p>
      )}
    </section>
  );
}
