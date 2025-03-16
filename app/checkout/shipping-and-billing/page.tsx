import {
  getAllCountryNames,
  getCountryNamesForQuery,
  getCountryPhoneCodes,
} from "@/app/lib/actions";
import AddressFormsContainer from "@/app/components/shipping-and-billing/AddressFormsContainer";
import Stepper from "@/app/components/Stepper";
import { ReturningCustomer } from "@/app/components/shipping-and-billing/ReturningCustomer";
import NavigationButtons from "@/app/components/shipping-and-billing/NavigationButtons";
import { CountriesInfo } from "@/app/checkout/models";

export default async function ShippingAndBillingPage() {
  const allCountryNames: string[] = await getAllCountryNames();
  const countryPhoneCodes: CountriesInfo = await getCountryPhoneCodes();

  return (
    <div className="flex flex-col items-center mb-8">
      {/*<Stepper activeLabel="Shipping & Billing" />*/}
      <main className="flex flex-col gap-8 w-144">
        <ReturningCustomer />
        <AddressFormsContainer
          allCountries={allCountryNames}
          countryPhoneCodes={countryPhoneCodes}
          getCountriesForQuery={getCountryNamesForQuery}
        />
      </main>
    </div>
  );
}
