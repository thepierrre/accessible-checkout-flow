"use client";
import "country-flag-icons/3x2/flags.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import {
  type AddressType,
  type CombinedAddressFormData,
  type CountriesWithCodes,
  combinedAddressFormSchema,
} from "@/app/checkout/models";
import AddressForm from "@/app/components/shipping-and-billing/AddressForm";
import BillingCheckbox from "@/app/components/shipping-and-billing/BillingCheckbox";
import ErrorContainer from "@/app/components/shipping-and-billing/ErrorContainer";
import NavigationButtons from "@/app/components/shipping-and-billing/NavigationButtons";
import useEditMode from "@/app/hooks/shippingAndBilling/useEditMode";
import usePersistedAddress from "@/app/hooks/shippingAndBilling/usePersistedAddress";
import useScrollOnError from "@/app/hooks/shippingAndBilling/useScrollOnError";
import useScrollIntoView from "@/app/hooks/useScrollIntoView";
import { submitAddressForm as submitAddressFormAction } from "@/app/lib/actions";
import { getCountryMatchesForNames } from "@/app/lib/countryQueries";

interface Props {
  //allCountries: string[];
  //getCountriesForQueryAction: (query: string) => Promise<string[]>;
  countriesWithCodes: CountriesWithCodes;
}

export default function AddressFormsContainer({
  //allCountries,
  //getCountriesForQueryAction,
  countriesWithCodes,
}: Props) {
  const formTitleId = useId();
  const formInstructionsId = useId();
  const addressFormId = useId();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [suggestedCountries, setSuggestedCountries] =
    useState<CountriesWithCodes>(countriesWithCodes);
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
    formState: { errors, isSubmitting },
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

  async function onCountryInputChange(
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { value } = event.target;

    setValue(`${addressType}.country`, value);

    const foundCountries = value
      ? getCountryMatchesForNames(countriesWithCodes, value)
      : countriesWithCodes;
    setSuggestedCountries(foundCountries);
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
    <div className="mx-auto w-160 rounded-xl bg-gradient-to-br from-gray-extralight to-gray-light p-10 shadow-md">
      <div className="mb-6">
        <p className="sr-only">Step 1 of 3</p>
        <span
          aria-hidden="true"
          className="rounded-full bg-blue-extralight px-2 py-0.5 text-blue-primary text-sm tracking-wide"
        >
          Step 1 of 3
        </span>
      </div>
      <section aria-labelledby="form-title" className="mb-4">
        <h1
          id={formTitleId}
          className="relative mb-6 inline-block font-bold text-3xl text-gray-900 uppercase tracking-wide"
        >
          Shipping & Billing
          <span className="-bottom-2 absolute left-0 h-1 w-[120%] bg-blue-primary"></span>
        </h1>

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
        <AddressForm
          ref={shippingAddressRef}
          addressType="shipping"
          suggestedCountries={suggestedCountries}
          countriesWithCodes={countriesWithCodes}
          onCountryInputChange={onCountryInputChange}
          onSuggestedCountryClick={onSuggestedCountryClick}
          onCountryPhoneCodeClick={onCountryPhoneCodeClick}
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />
        <BillingCheckbox
          {...register("isBillingAddressSame")}
          ref={(el) => {
            billingCheckboxRef.current = el;
            register("isBillingAddressSame").ref(el);
          }}
        />
        {!isBillingSame && (
          <AddressForm
            ref={billingAddressRef}
            addressType="billing"
            suggestedCountries={suggestedCountries}
            countriesWithCodes={countriesWithCodes}
            onCountryInputChange={onCountryInputChange}
            onSuggestedCountryClick={onSuggestedCountryClick}
            onCountryPhoneCodeClick={onCountryPhoneCodeClick}
            register={register}
            watch={watch}
            errors={errors}
            setValue={setValue}
          />
        )}
        <NavigationButtons
          isSubmitting={isSubmitting}
          currentStep="address"
          isEditing={isEditing}
        />
      </form>
    </div>
  );
}
