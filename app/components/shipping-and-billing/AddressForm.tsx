import { countries } from "countries-list";
import { type ChangeEvent, type Ref, useState } from "react";
import { useFormContext } from "react-hook-form";
import Heading from "@/app/components/shared/Heading";
import CountriesDatalist from "@/app/components/shipping-and-billing/CountriesDatalist";
import Input from "@/app/components/shipping-and-billing/Input";
import PhoneInput from "@/app/components/shipping-and-billing/PhoneInput";
import { getCountryMatchesForNames } from "@/app/lib/countryQueries";
import type { CombinedAddressFormData } from "@/app/schemas/addressFormSchema";
import type { AddressType } from "@/app/types/address";

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
        labelText="ZIP/Postal code"
        placeholder="81002"
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
      <CountriesDatalist
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
