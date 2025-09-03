"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Table from "@/app/components/review-and-pay/review-step/table/Table";
import Heading from "@/app/components/shared/Heading";
import Modal from "@/app/components/shared/Modal";
import editIcon from "@/public/icons/editIcon.svg";

export default function SummarySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section className="mt-2 flex flex-col">
        <div className="mb-2 flex border-gray-primary border-b pb-1">
          <div className="mb-2 flex grow gap-2">
            <Heading label="Summary (5 items)" as="h2" />
          </div>
          <Link
            href="/cart"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-1 rounded-full bg-blue-extralight px-3 font-medium text-blue-primary text-sm transition-colors duration-200 hover:bg-blue-light"
          >
            <Image src={editIcon} alt="" className="h-4 w-4" />
            Change
          </Link>
        </div>
        <Table caption="Order summary with product prices, shipping cost and total cost." />
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Demo"
        description="This is just a demo. No real cart here!"
      />
    </>
  );
}
