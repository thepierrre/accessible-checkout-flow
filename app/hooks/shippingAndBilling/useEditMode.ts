import type { ReadonlyURLSearchParams } from "next/navigation";
import { type RefObject, type SetStateAction, useEffect, useRef } from "react";
import type { UseFormClearErrors, UseFormSetValue } from "react-hook-form";
import type { CombinedAddressFormData } from "@/app/checkout/models";

interface useEditModeProps {
  searchParams: ReadonlyURLSearchParams;
  shippingAddressRef: RefObject<HTMLFieldSetElement | null>;
  billingAddressRef: RefObject<HTMLFieldSetElement | null>;
  isEditing: boolean | "shipping" | "billing";
  setIsEditing: (
    value: SetStateAction<boolean | "shipping" | "billing">,
  ) => void;
  setValue: UseFormSetValue<CombinedAddressFormData>;
  clearErrors: UseFormClearErrors<CombinedAddressFormData>;
}

export default function useEditMode({
  searchParams,
  shippingAddressRef,
  billingAddressRef,
  isEditing,
  setIsEditing,
  setValue,
  clearErrors,
}: useEditModeProps) {
  //TODO Don't reset if you enter the page with the editing=billing param
  //const isFirstRenderRef = useRef(true);

  useEffect(() => {
    const searchParam = searchParams.get("edit");
    console.log(searchParam);

    if (searchParam === "shipping" && shippingAddressRef.current) {
      setIsEditing("shipping");
      shippingAddressRef.current.scrollIntoView({
        block: "start",
        behavior: "instant",
      });
    } else if (searchParam === "billing") {
      setIsEditing("billing");
    }
  }, [searchParams, setIsEditing, shippingAddressRef]);

  useEffect(() => {
    if (isEditing === "billing" && billingAddressRef.current) {
      billingAddressRef.current.scrollIntoView({
        block: "start",
        behavior: "instant",
      });

      setValue("isBillingAddressSame", false, { shouldValidate: true });
      setValue("billing", {
        name: "",
        address: "",
        zip: "",
        country: "",
        phoneCode: "+1",
        phoneNumber: "",
        email: "",
        region: "",
      });
      clearErrors("billing");
    }
  }, [setValue, clearErrors, isEditing, billingAddressRef]);

  useEffect(() => {
    const searchParam = searchParams.get("edit");
    if (searchParam === "billing") {
      setIsEditing("billing");
      setValue("isBillingAddressSame", false, { shouldValidate: true });
    }
  }, [setIsEditing, searchParams, setValue]);
}
