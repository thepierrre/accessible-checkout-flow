"use client";
import "country-flag-icons/3x2/flags.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  type CombinedAddressFormData,
  combinedAddressFormSchema,
} from "@/app/schemas/addressFormSchema";
import Heading from "@/app/components/shared/Heading";
import StepBadge from "@/app/components/shared/StepBadge";
import AddressForm from "@/app/components/shipping-and-billing/AddressForm";
import BillingCheckbox from "@/app/components/shipping-and-billing/BillingCheckbox";
import ErrorContainer from "@/app/components/shipping-and-billing/ErrorContainer";
import NavigationButtons from "@/app/components/shipping-and-billing/NavigationButtons";
import { useAddress } from "@/app/context/AddressContext";
import useScrollIntoView from "@/app/hooks/navigation/useScrollIntoView";
import useEditMode from "@/app/hooks/shipping-and-billing/useEditMode";
import usePersistedAddress from "@/app/hooks/shipping-and-billing/usePersistedAddress";
import useScrollOnError from "@/app/hooks/shipping-and-billing/useScrollOnError";
import { submitAddressForm as submitAddressFormAction } from "@/app/lib/actions";
import { DEFAULT_FORM_VALUES } from "@/app/constants/defaultAddressFormValues";

export default function AddressFormStep() {
  const { setAddress } = useAddress();
  const formTitleId = useId();
  const formInstructionsId = useId();
  const addressFormId = useId();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState<boolean | "shipping" | "billing">(
    false,
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const shippingAddressRef = useRef<HTMLFieldSetElement | null>(null);
  const billingAddressRef = useRef<HTMLFieldSetElement | null>(null);
  const billingCheckboxRef = useRef<HTMLInputElement | null>(null);
  const serverErrorRef = useRef<HTMLElement | null>(null);

  const form = useForm<CombinedAddressFormData>({
    resolver: zodResolver(combinedAddressFormSchema),
    mode: "onBlur",
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { isSubmitting },
    clearErrors,
  } = form;

  const isBillingSame = watch("isBillingAddressSame");

  usePersistedAddress(setValue);
  useScrollOnError(serverErrorRef);
  useEditMode({
    searchParams,
    shippingAddressRef,
    billingAddressRef,
    isEditing,
    setIsEditing,
    setValue,
    clearErrors,
  });
  useScrollIntoView({ ref: billingAddressRef, dependencies: [isBillingSame] });

  useEffect(() => {
    if (billingCheckboxRef.current) {
      const checkbox = billingCheckboxRef.current;

      function onCheckboxEnterPress(event: KeyboardEvent) {
        if (event.key === "Enter") {
          event.preventDefault();
          checkbox.click();
        }
      }

      checkbox.addEventListener("keydown", onCheckboxEnterPress);
      return () =>
        checkbox.removeEventListener("keydown", onCheckboxEnterPress);
    }
  });

  function saveFormDataToSessionStorage(data: CombinedAddressFormData) {
    const dataString = JSON.stringify(data);
    sessionStorage.setItem("addressFormData", dataString);
  }

  const handleFormSubmit = async (event: FormEvent) => {
    console.log("values", getValues("shipping"), getValues("billing"));
    event.preventDefault();
    if (isBillingSame) {
      setValue("billing", getValues("shipping"));
    }
    await handleSubmit(
      async (data: CombinedAddressFormData) => {
        try {
          const response = await submitAddressFormAction(data);
          if (!response.success && response.errorMessage) {
            console.error("Internal Server Error:", response.errorMessage);
            setServerError(response.errorMessage);
          }

          saveFormDataToSessionStorage(data);
          setAddress({
            shipping: getValues("shipping"),
            billing: getValues("billing"),
            isBillingAddressSame: isBillingSame,
          });

          router.push("review-and-pay");
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Internal Server Error:", error.message);
            setServerError(error.message);
          } else {
            console.error("Internal Server Error:", error);
            setServerError("A server error occurred. Please try again.");
          }
        }
      },
      (errors) => {
        console.error(
          "Failed to submit. The form has one or more errors:",
          errors,
        );
      },
    )();
  };

  return (
    <div className="mx-auto w-full px-6 sm:w-160 sm:rounded-xl sm:bg-gradient-to-br sm:from-gray-extralight sm:to-gray-light sm:p-10 sm:shadow-md">
      <StepBadge current={1} max={3} />
      <section aria-labelledby="form-title" className="w-full">
        <Heading label="Shipping & Billing" as="h1" id={formTitleId} />
        <p id={formInstructionsId} className="sr-only">
          All fields marked with &#34;required&#34; must be completed. Phone
          number and state/province are optional. You can use the checkbox if
          the delivery differs from billing.
        </p>
      </section>
      <form
        aria-describedby={formInstructionsId}
        id={addressFormId}
        name="address-form"
        onSubmit={handleFormSubmit}
      >
        {serverError && (
          <ErrorContainer ref={serverErrorRef} errorMessage={serverError} />
        )}
        <FormProvider {...form}>
          <AddressForm ref={shippingAddressRef} addressType="shipping" />
          <BillingCheckbox
            {...register("isBillingAddressSame")}
            ref={(el) => {
              billingCheckboxRef.current = el;
              register("isBillingAddressSame").ref(el);
            }}
          />
          {!isBillingSame && (
            <AddressForm ref={billingAddressRef} addressType="billing" />
          )}
        </FormProvider>
        <NavigationButtons
          isSubmitting={isSubmitting}
          currentStep="address"
          isEditing={isEditing}
        />
      </form>
    </div>
  );
}
