import type { ReadonlyURLSearchParams } from "next/navigation";
import { type RefObject, type SetStateAction, useEffect, useRef } from "react";
import type {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import type { CombinedAddressFormData } from "@/app/schemas/addressFormSchema";

interface useEditModeProps {
  searchParams: ReadonlyURLSearchParams;
  shippingAddressRef: RefObject<HTMLFieldSetElement | null>;
  billingAddressRef: RefObject<HTMLFieldSetElement | null>;
  setIsEditing: (
    value: SetStateAction<boolean | "shipping" | "billing">,
  ) => void;
  setValue: UseFormSetValue<CombinedAddressFormData>;
  getValues: UseFormGetValues<CombinedAddressFormData>;
  clearErrors: UseFormClearErrors<CombinedAddressFormData>;
}

export default function useEditMode({
  searchParams,
  shippingAddressRef,
  billingAddressRef,
  setIsEditing,
  setValue,
  getValues,
  clearErrors,
}: useEditModeProps) {
  const firstRender = useRef(true);

  useEffect(() => {
    const searchParam = searchParams.get("edit");
    if (searchParam === "shipping" && shippingAddressRef.current) {
      shippingAddressRef.current.scrollIntoView({
        block: "start",
        behavior: "instant",
      });
      setIsEditing("shipping");
    } else if (searchParam === "billing") {
      setIsEditing("billing");

      const wasBillingTheSame = getValues("isBillingAddressSame");

      setValue("isBillingAddressSame", false, { shouldValidate: true });

      if (wasBillingTheSame) {
        setValue("billing", {
          name: "",
          address: "",
          zip: "",
          country: "",
          phone: "",
          email: "",
          region: "",
        });
        clearErrors("billing");
      }
    }
  }, [
    searchParams,
    setIsEditing,
    shippingAddressRef,
    clearErrors,
    setValue,
    getValues,
  ]);

  useEffect(() => {
    const searchParam = searchParams.get("edit");
    if (searchParam === "billing" && billingAddressRef.current) {
      billingAddressRef.current.scrollIntoView({
        block: "start",
        behavior: firstRender.current ? "instant" : "smooth",
      });

      firstRender.current = false;
    }
  });
}
