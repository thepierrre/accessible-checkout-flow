"use client";

import { useState } from "react";
import Button from "@/components/shared/Button";
import Modal from "@/components/shared/Modal";

export default function ShopMoreButton() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  return (
    <>
      <p className="font-semibold">Looking for something else?</p>

      <Button
        onClick={() => setIsDemoModalOpen(true)}
        label="Continue shopping"
      />
      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Demo"
        description="This is just a checkout flow demo. No real shop here."
      />
    </>
  );
}
