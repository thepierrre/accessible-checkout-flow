import AddressFormStep from "@/app/components/shipping-and-billing/AddressFormStep";
import { ReturningCustomer } from "@/app/components/shipping-and-billing/ReturningCustomer";
import { Suspense } from "react";
import { icons } from "@/app/constants/icons";

export const metadata = {
  title: "Checkout | Address",
  icons,
};

export default async function ShippingAndBillingPage() {
  return (
    <Suspense fallback={<div></div>}>
      <main className="my-8 flex animate-fade-in-up flex-col items-center sm:gap-8">
        <ReturningCustomer />
        <AddressFormStep />
      </main>
    </Suspense>
  );
}
