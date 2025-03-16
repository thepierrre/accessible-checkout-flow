"use server";

import { countries } from "countries-list";
import { CountriesInfo } from "@/app/checkout/models";

// TODO: Cache
export async function getCountryPhoneCodes() {
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

export async function getAllCountryNames(): Promise<string[]> {
  const countries = await getCountryPhoneCodes();
  return Object.keys(countries).map((country) => country);
}

export async function getCountryNamesForQuery(
  query: string,
): Promise<string[]> {
  const countries = await getCountryPhoneCodes();
  return Object.keys(countries).filter((countryName: string) =>
    countryName.toLowerCase().startsWith(query.toLowerCase()),
  );
}
