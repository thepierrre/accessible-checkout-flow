"use server";

import { countries } from "countries-list";
import { CombinedAddressFormData, CountriesInfo } from "@/app/checkout/models";
import { NextResponse } from "next/server";

type ServerErrorResponse = {
  success: boolean;
  error?: string;
};

export async function submitAddressForm(
  formData: CombinedAddressFormData,
): Promise<ServerErrorResponse> {
  try {
    console.log(formData);
    return { success: true };
    //throw { message: "bla" };
  } catch (error: unknown) {
    console.error("Internal Server Error:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return {
        success: false,
        error: "A server error occurred. Please try again.",
      };
    }
  }
}

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
