import { getCountryNamesForQuery } from "@/app/checkout/actions";
import AddressFormsContainer from "@/app/ui/shipping/AddressFormsContainer";
import ProgressBreadcrumbs from "@/app/ui/ProgressBreadcrumbs";
import { ReturningCustomer } from "@/app/ui/shipping/ReturningCustomer";

export default function ShippingPage() {
  return (
    <div className="flex flex-col items-center">
      <ProgressBreadcrumbs activeLabel="Payment" />
      <main className="flex flex-col gap-8 w-112">
        <ReturningCustomer />
        <AddressFormsContainer getCountries={getCountryNamesForQuery} />
      </main>
    </div>
  );
}
