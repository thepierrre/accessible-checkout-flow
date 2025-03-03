import { getCountryNamesForQuery } from "@/app/checkout/actions";
import AddressFormsContainer from "@/app/ui/shipping/AddressFormsContainer";
import ProgressBar from "@/app/ui/ProgressBar";

export default function ShippingPage() {
  return (
    <div>
      <ProgressBar activeLabel="Shipping & Billing" />
      <h1>Shipping</h1>
      <AddressFormsContainer getCountries={getCountryNamesForQuery} />
    </div>
  );
}
