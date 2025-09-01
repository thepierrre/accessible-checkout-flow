import type { CountriesWithCodes } from "@/app/checkout/models";
import AddressFormsContainer from "@/app/components/shipping-and-billing/AddressFormsContainer";
import { ReturningCustomer } from "@/app/components/shipping-and-billing/ReturningCustomer";
import { getCountryPhoneCodes } from "@/app/lib/actions";

export default async function ShippingAndBillingPage() {
  //const allCountryNames: string[] = await getAllCountryNames();
  const countriesWithCodes: CountriesWithCodes = await getCountryPhoneCodes();

  return (
    <main className="my-8 flex flex-col items-center gap-8">
      <ReturningCustomer />
      <AddressFormsContainer
        //allCountries={allCountryNames}
        countriesWithCodes={countriesWithCodes}
        //getCountriesForQueryAction={getCountryNamesForQuery}
      />
    </main>
  );
}
