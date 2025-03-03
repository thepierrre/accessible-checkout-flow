import { getCountryNamesForQuery } from "@/app/checkout/actions";
import AddressFormsContainer from "@/app/ui/shipping/AddressFormsContainer";

export default function ShippingPage() {
  return (
    <div>
      <h1>Shipping</h1>
      <AddressFormsContainer getCountries={getCountryNamesForQuery} />
    </div>
  );
}
