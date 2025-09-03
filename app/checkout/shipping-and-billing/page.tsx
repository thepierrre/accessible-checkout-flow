import AddressFormStep from "@/app/components/shipping-and-billing/AddressFormStep";
import { ReturningCustomer } from "@/app/components/shipping-and-billing/ReturningCustomer";

export default async function ShippingAndBillingPage() {
  return (
    <main className="my-8 flex flex-col items-center gap-8">
      <ReturningCustomer />
      <AddressFormStep />
    </main>
  );
}
