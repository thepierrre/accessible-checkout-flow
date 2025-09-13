"use client";

import { useState } from "react";
import PromoCodeForm from "@/components/review-and-pay/review-step/PromoCodeForm";
import Heading from "@/components/shared/Heading";
import { useOrderSummary } from "@/context/OrderSummaryContext";
import collapseIcon from "@/public/icons/collapseIcon.svg";
import expandIcon from "@/public/icons/expandIcon.svg";
import Button from "@/components/shared/Button";

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
    <section className="flex flex-col border-gray-300 border-b pb-4">
      <div className="flex">
        <div className="mb-2 flex grow gap-2">
          <Heading label="Promo code" as="h2" />
        </div>
        <Button
          variant="soft"
          size="small"
          label={
            !isAddingCode ? (!discount ? "Add code" : "Expand") : "Collapse"
          }
          onClick={handleCollapseOrExpand}
          icon={{
            img: { src: handleCodeIconDisplay(), alt: "Add code icon" },
            position: "right",
          }}
        ></Button>
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
