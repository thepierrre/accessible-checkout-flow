import { countries } from "countries-list";
import { type ChangeEvent, type Ref, useState } from "react";
import { useFormContext } from "react-hook-form";
import Heading from "@/components/shared/Heading";
import CountryPopup from "@/components/shipping-and-billing/CountryPopup";
import Input from "@/components/shipping-and-billing/Input";
import PhoneInput from "@/components/shipping-and-billing/phone-input/PhoneInput";
import { getCountryMatchesForNames } from "@/lib/countryQueries";
import type { CombinedAddressFormData } from "@/schemas/addressFormSchema";
import type { AddressType } from "@/types/address";

interface Props {
  ref?: Ref<HTMLFieldSetElement>;
  addressType: AddressType;
}

export type FieldNameType = keyof {
  name: string;
  address: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  region: string;
};

const COUNTRY_NAMES = Object.values(countries).map((c) => c.name);

export default function AddressForm({ ref = null, addressType }: Props) {
  const [suggestedCountries, setSuggestedCountries] =
    useState<string[]>(COUNTRY_NAMES);
  const { watch, setValue } = useFormContext<CombinedAddressFormData>();

  const country = watch(`${addressType}.country`);

  async function onCountryInputChange(
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { value } = event.target;

    setValue(`${addressType}.country`, value);

    const foundCountries = value
      ? getCountryMatchesForNames(COUNTRY_NAMES, value)
      : suggestedCountries;
    setSuggestedCountries(foundCountries);
  }

  function onSuggestedCountryClick(country: string, addressType: AddressType) {
    setValue(`${addressType}.country`, country, { shouldValidate: true });
  }

  return (
    <fieldset className="flex w-full flex-col gap-4" ref={ref}>
      <header>
        <Heading label={`${addressType} address`} as="legend" />
      </header>
      <Input
        required={true}
        name="email"
        labelText="Email"
        placeholder="max.mustermann@example.com"
        addressType={addressType}
        autoComplete="email"
        type="email"
      />
      <Input
        required={true}
        name="name"
        labelText="Full name"
        placeholder="Max Mustermann"
        addressType={addressType}
        autoComplete="name"
        type="text"
      />

      <Input
        required={true}
        name="address"
        labelText="Address"
        placeholder="Munich Av. 20, Apt. 1"
        addressType={addressType}
        autoComplete="street-address"
        type="text"
      />
      <Input
        required={true}
        name="zip"
        labelText="Postal code and city"
        placeholder="12345 Munich"
        addressType={addressType}
        autoComplete="postal-code"
        type="tel"
      />
      <Input
        name="region"
        labelText="State/Province (optional)"
        placeholder="Bavaria"
        addressType={addressType}
        autoComplete="address-level1"
        type="text"
      />
      <CountryPopup
        countries={suggestedCountries}
        addressType={addressType}
        country={country}
        onCountryClick={onSuggestedCountryClick}
        onCountryInputChange={onCountryInputChange}
        setValue={setValue}
      />
      <PhoneInput
        labelText="Phone number (optional)"
        addressType={addressType}
      />
    </fieldset>
  );
}
