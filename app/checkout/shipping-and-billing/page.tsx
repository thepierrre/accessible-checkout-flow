import AddressFormStep from "@/app/components/shipping-and-billing/AddressFormStep";
import { ReturningCustomer } from "@/app/components/shipping-and-billing/ReturningCustomer";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Address",
  description: "Enter your shipping and billing details.",
};

export default async function ShippingAndBillingPage() {
  return (
    <Suspense fallback={<div />}>
      <div className="my-8 flex animate-fade-in-up flex-col items-center sm:gap-8">
        <ReturningCustomer />
        <AddressFormStep />
      </div>
    </Suspense>
  );
}
