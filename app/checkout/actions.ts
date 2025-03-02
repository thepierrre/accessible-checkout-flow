"use server";

import { countries } from "countries-list";
import { CountriesInfo } from "@/app/checkout/models";

// TODO: Cache
export async function getCountriesInfo() {
  return Object.values(countries).reduce(
    (accumulatedObject, currentCountry) => {
      return {
        ...accumulatedObject,
        [currentCountry.name]: currentCountry.phone,
      };
    },
    {} as CountriesInfo,
  );
}

export async function getCountryNamesForQuery(query: string) {
  const countries = await getCountriesInfo();
  return Object.keys(countries).filter((countryName: string) =>
    countryName.startsWith(query),
  );
}
