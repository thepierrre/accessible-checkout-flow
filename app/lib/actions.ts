"use server";

import type { CombinedAddressFormData } from "@/app/schemas/addressFormSchema";
import type { ServerResponse } from "@/app/types/server";

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
