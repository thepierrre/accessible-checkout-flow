import {
  getAllCountryNames,
  getCountryNamesForQuery,
  getCountryPhoneCodes,
} from "@/app/lib/actions";
import AddressFormsContainer from "@/app/components/shipping-and-billing/AddressFormsContainer";
import { ReturningCustomer } from "@/app/components/shipping-and-billing/ReturningCustomer";
import { CountriesWithCodes } from "@/app/checkout/models";

export default async function ShippingAndBillingPage() {
  //const allCountryNames: string[] = await getAllCountryNames();
  const countriesWithCodes: CountriesWithCodes = await getCountryPhoneCodes();

  return (
    <main className="flex flex-col gap-8 items-center my-8">
      <ReturningCustomer />
      <AddressFormsContainer
        //allCountries={allCountryNames}
        countriesWithCodes={countriesWithCodes}
        //getCountriesForQueryAction={getCountryNamesForQuery}
      />
    </main>
  );
}
