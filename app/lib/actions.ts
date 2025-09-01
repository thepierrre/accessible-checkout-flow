"use server";

import { countries } from "countries-list";
import { cache } from "react";
import type {
  CombinedAddressFormData,
  CountriesWithCodes,
} from "@/app/checkout/models";

type ServerResponse = {
  success: boolean;
  message?: string;
  errorMessage?: string;
};

export async function getDiscount(promoCode: string): Promise<ServerResponse> {
  if (promoCode === "TIMEFORCOFFEE") {
    return { success: true, message: "10" };
  } else if (promoCode === "SALE-XXL") {
    return { success: true, message: "25" };
  } else {
    return {
      success: false,
      errorMessage: "Promo code is incorrect or expired.",
    };
  }
}

export async function submitAddressForm(
  formData: CombinedAddressFormData,
): Promise<ServerResponse> {
  try {
    console.log(formData);
    return { success: true };
  } catch (error: unknown) {
    console.error("Internal Server Error:", error);
    if (error instanceof Error) {
      return { success: false, errorMessage: error.message };
    } else {
      return {
        success: false,
        errorMessage: "A server error occurred. Please try again.",
      };
    }
  }
}

async function _getCountryPhoneCodes() {
  return Object.values(countries).reduce(
    (accumulatedObject, currentCountry) => {
      return {
        ...accumulatedObject,
        [currentCountry.name]: currentCountry.phone[0],
      };
    },
    {} as CountriesWithCodes,
  );
}

export const getCountryPhoneCodes = cache(_getCountryPhoneCodes);

async function _getAllCountryNames(): Promise<string[]> {
  const countries = await getCountryPhoneCodes();
  return Object.keys(countries).map((country) => country);
}

export const getAllCountryNames = cache(_getAllCountryNames);

export async function getCountryNamesForQuery(
  query: string,
): Promise<string[]> {
  const countries = await getCountryPhoneCodes();
  return Object.keys(countries).filter((countryName: string) =>
    countryName.toLowerCase().startsWith(query.toLowerCase()),
  );
}
