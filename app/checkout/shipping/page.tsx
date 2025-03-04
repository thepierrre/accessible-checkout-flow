import { getCountryNamesForQuery } from "@/app/checkout/actions";
import AddressFormsContainer from "@/app/ui/shipping/AddressFormsContainer";
import ProgressBar from "@/app/ui/ProgressBar";

export default function ShippingPage() {
  return (
    <div>
      <ProgressBreadcrumbs activeLabel="Shipping & Billing" />
      <ReturningCustomer />
      <AddressFormsContainer getCountries={getCountryNamesForQuery} />
    </div>
  );
}
