import { useEffect } from "react";
import type { UseFormSetValue } from "react-hook-form";
import {
  getAddressData,
  isBillingSameAsShipping,
} from "@/lib/addressDataUtils";
import type { CombinedAddressFormData } from "@/schemas/addressFormSchema";

export default function usePersistedAddress(
  setValue: UseFormSetValue<CombinedAddressFormData>,
) {
  useEffect(() => {
    const { shipping, billing } = getAddressData();
    if (shipping && billing && isBillingSameAsShipping()) {
      setValue("shipping", shipping);
    } else if (shipping && billing && !isBillingSameAsShipping()) {
      setValue("shipping", shipping);
      setValue("billing", billing);
      setValue("isBillingAddressSame", false);
    }
  }, [setValue]);
}
