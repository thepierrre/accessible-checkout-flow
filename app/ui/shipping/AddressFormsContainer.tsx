"use client";
import "country-flag-icons/3x2/flags.css";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import AddressForm from "@/app/ui/shipping/AddressForm";
import {
  AddressType,
  CombinedAddressFormData,
  combinedAddressFormSchema,
  CountriesInfo,
} from "@/app/checkout/models";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NavigationButtons from "@/app/ui/shipping/NavigationButtons";
import { redirect } from "next/navigation";
import Image from "next/image";
import warningIcon from "../../../public/warning-icon.svg";

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
      <section className="flex gap-2 my-8">
        <input
          id="billing-same-checkbox"
          type="checkbox"
          checked={isBillingSame}
          onChange={onCheckboxChange}
          className="relative peer shrink-0 self-center appearance-none w-6 h-6 border-2 border-blue-primary rounded-md bg-white checked:bg-blue-primary checked:border-0 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-700"
        />
        <label htmlFor="billing-same-checkbox" className="font-medium text-xl">
          Use for billing
        </label>
        <svg
          className="absolute w-4 h-4 mt-1.5 ml-1 hidden peer-checked:block pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </section>
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
      {hasFormErrors && (
        <section className="flex gap-4 text-red-primary border border-red-primary py-2 px-4 rounded-lg my-8">
          <Image src={warningIcon} alt="Error warning icon" />
          <div>
            <p className="font-semibold antialiased">Error</p>
            <p>Please fix the errors in the form.</p>
          </div>
        </section>
      )}
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
