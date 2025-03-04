import { getCountryNamesForQuery } from "@/app/checkout/actions";
import AddressFormsContainer from "@/app/ui/shipping/AddressFormsContainer";
import ProgressBreadcrumbs from "@/app/ui/ProgressBreadcrumbs";
import { ReturningCustomer } from "@/app/ui/shipping/ReturningCustomer";

export default function ShippingPage() {
  return (
    <div>
      <ProgressBreadcrumbs activeLabel="Shipping & Billing" />
      <ReturningCustomer />
      <AddressFormsContainer getCountries={getCountryNamesForQuery} />
    </div>
  );
}
