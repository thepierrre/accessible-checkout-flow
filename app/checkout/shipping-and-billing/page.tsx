import {
  getAllCountryNames,
  getCountryNamesForQuery,
  getCountryPhoneCodes,
} from "@/app/lib/actions";
import AddressFormsContainer from "@/app/components/shipping-and-billing/AddressFormsContainer";
import { ReturningCustomer } from "@/app/components/shipping-and-billing/ReturningCustomer";
import { CountriesInfo } from "@/app/checkout/models";

export default async function ShippingAndBillingPage() {
  const allCountryNames: string[] = await getAllCountryNames();
  const countryPhoneCodes: CountriesInfo = await getCountryPhoneCodes();

  return (
    <div className="flex flex-col items-center mb-8">
      <main className="flex flex-col gap-8 w-144">
        <ReturningCustomer />
        <AddressFormsContainer
          allCountries={allCountryNames}
          countryPhoneCodes={countryPhoneCodes}
          getCountriesForQueryAction={getCountryNamesForQuery}
        />
      </main>
    </div>
  );
}
