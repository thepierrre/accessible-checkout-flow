"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/app/components/shared/Modal";
import Button from "@/app/components/shared/Button";

interface Props {
  isSubmitting: boolean;
  currentStep: "cart" | "address" | "final";
  isEditing: boolean | "shipping" | "billing";
}

export default function NavigationButtons({
  isSubmitting,
  currentStep,
  isEditing,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  function handlePreviousStepClick() {
    if (currentStep === "address") {
      //router.push("/cart");
      setIsModalOpen(true);
    }
  }

  function getNextStepText() {
    if (currentStep === "cart") return "Shipping & Billing";
    else if (currentStep === "address") {
      if (isEditing) return "Save Changes & Pay";
      else return "Review & Pay";
    }
    return "";
  }

  return (
    <section className="mt-6 flex place-content-between">
      {currentStep === "address" && (
        <Button
          onClick={handlePreviousStepClick}
          label="Back to cart"
          variant="secondary"
        />
      )}
      <Button type="submit" label={getNextStepText()} disabled={isSubmitting} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Demo"
        description="This is just a demo. No real cart here!"
      />
    </section>
  );
}
