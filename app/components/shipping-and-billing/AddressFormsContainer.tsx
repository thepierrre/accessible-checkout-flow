"use client";
import "country-flag-icons/3x2/flags.css";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import AddressForm from "@/app/components/shipping-and-billing/AddressForm";
import {
  AddressType,
  CombinedAddressFormData,
  combinedAddressFormSchema,
  CountriesInfo,
} from "@/app/checkout/models";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NavigationButtons from "@/app/components/shipping-and-billing/NavigationButtons";
import { redirect } from "next/navigation";
import ErrorContainer from "@/app/components/shipping-and-billing/ErrorContainer";
import BillingCheckbox from "@/app/components/shipping-and-billing/BillingCheckbox";

interface Props {
  allCountries: string[];
  getCountriesForQuery: (query: string) => Promise<string[]>;
  countryPhoneCodes: CountriesInfo;
}

export default function AddressFormsContainer({
  allCountries,
  getCountriesForQuery,
  countryPhoneCodes,
}: Props) {
  const [suggestedCountries, setSuggestedCountries] =
    useState<string[]>(allCountries);

  const billingAddressRef = useRef<HTMLFieldSetElement | null>(null);
  const billingCheckboxRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<CombinedAddressFormData>({
    resolver: zodResolver(combinedAddressFormSchema),
    mode: "all",
    defaultValues: {
      shipping: {
        name: "",
        address: "",
        zip: "",
        country: "",
        phoneCode: "+1",
        phoneNumber: "",
        email: "",
        region: "",
      },
      billing: {
        name: "",
        address: "",
        zip: "",
        country: "",
        phoneCode: "+1",
        phoneNumber: "",
        email: "",
        region: "",
      },
      isBillingAddressSame: true,
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = form;

  const hasFormErrors = Object.keys(errors).length > 0;

  const isBillingSame = watch("isBillingAddressSame");

  useEffect(() => {
    if (!isBillingSame && billingAddressRef.current) {
      billingAddressRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [isBillingSame]);

  useEffect(() => {
    if (getValues("isBillingAddressSame")) {
      setValue("billing", getValues("shipping"));
    }
  });

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

  const onCheckboxChange = () => {
    const currentIsBillingSame: boolean = getValues("isBillingAddressSame");
    const newIsBillingSame: boolean = !currentIsBillingSame;
    console.log(errors);
    if (newIsBillingSame) {
      setTimeout(() => {
        setValue("isBillingAddressSame", newIsBillingSame);
      }, 550);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setValue("billing", getValues("shipping"));
    } else {
      setValue("isBillingAddressSame", newIsBillingSame);
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
  };

  async function onCountryInputChange(
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { value } = event.target;

    setValue(`${addressType}.country`, value);

    const foundCountries = value
      ? await getCountriesForQuery(value)
      : allCountries;
    setSuggestedCountries(foundCountries);

    console.log("found countries: ", suggestedCountries);
  }

  function onSuggestedCountryClick(country: string, addressType: AddressType) {
    setValue(`${addressType}.country`, country, { shouldValidate: true });
  }

  function onCountryPhoneCodeClick(
    phoneCodeNum: number,
    addressType: AddressType,
  ) {
    const phoneCode = phoneCodeNum.toString();
    setValue(`${addressType}.phoneCode`, phoneCode);
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isBillingSame) {
      setValue("billing", getValues("shipping"));
    }
    await handleSubmit(
      (data: CombinedAddressFormData) => {
        console.log(data);
        redirect("/checkout/payment");
      },
      (errors) => {
        console.log(errors);
      },
    )();
  };

  return (
    <form
      id="address-form"
      name="address-form"
      onSubmit={handleFormSubmit}
      className="w-full p-6 border border-gray-primary rounded-lg"
    >
      <AddressForm
        addressType="shipping"
        suggestedCountries={suggestedCountries}
        countryPhoneCodes={countryPhoneCodes}
        onCountryInputChange={onCountryInputChange}
        onSuggestedCountryClick={onSuggestedCountryClick}
        onCountryPhoneCodeClick={onCountryPhoneCodeClick}
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
      />
      <BillingCheckbox
        ref={billingCheckboxRef}
        checked={isBillingSame}
        onChange={onCheckboxChange}
      />

      {!isBillingSame && (
        <AddressForm
          ref={billingAddressRef}
          addressType="billing"
          suggestedCountries={suggestedCountries}
          countryPhoneCodes={countryPhoneCodes}
          onCountryInputChange={onCountryInputChange}
          onSuggestedCountryClick={onSuggestedCountryClick}
          onCountryPhoneCodeClick={onCountryPhoneCodeClick}
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />
      )}
      {hasFormErrors && <ErrorContainer />}
      <NavigationButtons
        isSubmitting={isSubmitting}
        previousStepName="Cart"
        nextStepName="Review Order"
        prevStepHref="basket"
        nextStepHref="review-order"
      />
    </form>
  );
}
