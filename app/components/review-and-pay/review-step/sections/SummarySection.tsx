"use client";

import { useState } from "react";
import Table from "@/app/components/review-and-pay/review-step/table/Table";
import Heading from "@/app/components/shared/Heading";
import Modal from "@/app/components/shared/Modal";
import editIcon from "@/public/icons/editIcon.svg";
import LinkButton from "@/app/components/shared/LinkButton";

export default function SummarySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section className="mt-2 flex flex-col">
        <div className="mb-2 flex pb-2">
          <div className="flex grow gap-2">
            <Heading label="Summary (5 items)" as="h2" />
          </div>
          <LinkButton
            variant="soft"
            label="Change"
            href="/cart"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            icon={{
              img: { src: editIcon, alt: "" },
              position: "right",
            }}
          />
        </div>
        <Table caption="Order summary with product prices, shipping cost and total cost." />
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Demo"
        description="This is just a checkout flow demo. No real cart here!"
      />
    </>
  );
}
