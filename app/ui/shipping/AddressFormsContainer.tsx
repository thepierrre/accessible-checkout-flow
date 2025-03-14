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
import { getAllCountryCodes } from "@/app/checkout/actions";

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
        phone: "",
        email: "",
        region: "",
      },
      billing: {
        name: "",
        address: "",
        zip: "",
        country: "",
        phone: "",
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
    formState: { errors, isSubmitting },
  } = form;

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
    const currentBillingStatus: boolean = getValues("isBillingAddressSame");
    const newBillingStatus: boolean = !currentBillingStatus;
    setValue("isBillingAddressSame", newBillingStatus);

    if (newBillingStatus) {
      setValue("billing", getValues("shipping"));
    } else {
      setValue("billing", {
        name: "",
        address: "",
        zip: "",
        country: "",
        phone: "",
        email: "",
        region: "",
      });
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

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isBillingSame) {
      setValue("billing", getValues("shipping"));
    }
    await handleSubmit(
      (data: CombinedAddressFormData) => {
        console.log(data);
      },
      (errors) => {
        console.log(errors);
      },
    )();
  };

  return (
    <form id="address-form" name="address-form" onSubmit={handleFormSubmit}>
      <AddressForm
        addressType="shipping"
        suggestedCountries={suggestedCountries}
        countryPhoneCodes={countryPhoneCodes}
        onCountryInputChange={onCountryInputChange}
        onCheckboxChange={onCheckboxChange}
        onSuggestedCountryClick={onSuggestedCountryClick}
        isBillingAddressSame={isBillingSame}
        register={register}
        watch={watch}
        errors={errors}
      />
      {!isBillingSame && (
        <AddressForm
          ref={billingAddressRef}
          addressType="billing"
          suggestedCountries={suggestedCountries}
          countryPhoneCodes={countryPhoneCodes}
          onCountryInputChange={onCountryInputChange}
          onSuggestedCountryClick={onSuggestedCountryClick}
          register={register}
          watch={watch}
          errors={errors}
        />
      )}
      <NavigationButtons
        previousStepName="Basket"
        nextStepName="Review Order"
        prevStepHref="basket"
        nextStepHref="review-order"
      />
    </form>
  );
}
