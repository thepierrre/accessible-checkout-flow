import {
  getAllCountryNames,
  getCountryNamesForQuery,
  getCountryPhoneCodes,
} from "@/app/checkout/actions";
import AddressFormsContainer from "@/app/ui/shipping/AddressFormsContainer";
import Stepper from "@/app/ui/Stepper";
import { ReturningCustomer } from "@/app/ui/shipping/ReturningCustomer";
import NavigationButtons from "@/app/ui/shipping/NavigationButtons";
import { CountriesInfo } from "@/app/checkout/models";

export default async function ShippingAndBillingPage() {
  const allCountryNames: string[] = await getAllCountryNames();
  const countryPhoneCodes: CountriesInfo = await getCountryPhoneCodes();

  return (
    <div className="flex flex-col items-center mb-8">
      {/*<Stepper activeLabel="Shipping & Billing" />*/}
      <main className="flex flex-col gap-8 w-112">
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
