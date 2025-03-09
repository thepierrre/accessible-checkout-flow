import {
  getAllCountryNames,
  getCountryNamesForQuery,
} from "@/app/checkout/actions";
import AddressFormsContainer from "@/app/ui/shipping/AddressFormsContainer";
import Stepper from "@/app/ui/Stepper";
import { ReturningCustomer } from "@/app/ui/shipping/ReturningCustomer";
import NavigationButtons from "@/app/ui/shipping/NavigationButtons";

export default async function ShippingAndBillingPage() {
  const allCountryNames: string[] = await getAllCountryNames();

  return (
    <div className="flex flex-col items-center mb-8">
      <Stepper activeLabel="Shipping & Billing" />
      <main className="flex flex-col gap-8 w-112">
        <ReturningCustomer />
        <AddressFormsContainer
          allCountries={allCountryNames}
          getCountriesForQuery={getCountryNamesForQuery}
        />
        <NavigationButtons
          previousStepName="Basket"
          nextStepName="Review Order"
          prevStepHref="basket"
          nextStepHref="review-order"
        />
      </main>
    </div>
  );
}
