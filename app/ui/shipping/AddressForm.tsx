import { ChangeEvent, Ref } from "react";
import {
  AddressType,
  CombinedAddressFormData,
  CountriesInfo,
} from "@/app/checkout/models";
import CountriesDatalist from "@/app/ui/shipping/CountriesDatalist";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import Input from "@/app/ui/shipping/Input";
import PhoneInput from "@/app/ui/shipping/PhoneInput";

interface Props {
  ref?: Ref<HTMLFieldSetElement>;
  addressType: AddressType;
  suggestedCountries: string[];
  countryPhoneCodes: CountriesInfo;
  onCountryInputChange: (
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onSuggestedCountryClick: (country: string, addressType: AddressType) => void;
  onCountryPhoneCodeClick: (
    phoneCodeNum: number,
    addressType: AddressType,
  ) => void;
  register: UseFormRegister<CombinedAddressFormData>;
  watch: UseFormWatch<CombinedAddressFormData>;
  errors: FieldErrors<CombinedAddressFormData>;
  setValue: UseFormSetValue<CombinedAddressFormData>;
}

export type FieldNameType = keyof {
  name: string;
  address: string;
  zip: string;
  country: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
  region: string;
};

export default function AddressForm({
  ref = null,
  addressType,
  suggestedCountries,
  countryPhoneCodes,
  onCountryInputChange,
  onSuggestedCountryClick,
  onCountryPhoneCodeClick,
  register,
  watch,
  errors,
  setValue,
}: Props) {
  const country = watch(`${addressType}.country`);

  function getErrorMessage(fieldName: FieldNameType) {
    return errors[addressType]?.[fieldName]?.message || null;
  }

  return (
    <fieldset className="flex flex-col gap-4 w-full" ref={ref}>
      <header>
        <h1 className="text-3xl mb-2 font-medium">
          <span className="capitalize">{addressType}</span> address
        </h1>
        <h2 className="mb-2 text-gray-dark">
          Please enter your {addressType} details below.
        </h2>
      </header>

      <Input
        name="email"
        labelText="Email"
        placeholder="e.g. max.mustermann@example.com"
        addressType={addressType}
        register={register}
        autoComplete="email"
        type="email"
        getErrorMessage={getErrorMessage}
      />
      <Input
        name="name"
        labelText="Full name"
        placeholder="e.g. Max Mustermann"
        addressType={addressType}
        register={register}
        autoComplete="name"
        type="text"
        getErrorMessage={getErrorMessage}
      />

      <Input
        name="address"
        labelText="Address"
        placeholder="e.g. Munich Av. 20, Apt. 1"
        addressType={addressType}
        register={register}
        autoComplete="street-address"
        type="text"
        getErrorMessage={getErrorMessage}
      />
      <Input
        name="zip"
        labelText="ZIP/Postal code"
        placeholder="e.g. 81002"
        addressType={addressType}
        register={register}
        autoComplete="postal-code"
        type="text"
        getErrorMessage={getErrorMessage}
      />
      <Input
        name="region"
        labelText="State/Province (optional)"
        placeholder="e.g. Bavaria"
        addressType={addressType}
        register={register}
        autoComplete="address-level1"
        type="text"
        getErrorMessage={getErrorMessage}
      />
      <CountriesDatalist
        suggestedCountries={suggestedCountries}
        addressType={addressType}
        country={country}
        onCountryClick={onSuggestedCountryClick}
        onCountryInputChange={onCountryInputChange}
        register={register}
        getErrorMessage={getErrorMessage}
      />
      <PhoneInput
        labelText="Phone number"
        addressType={addressType}
        register={register}
        autoComplete="tel"
        type="tel"
        getErrorMessage={getErrorMessage}
        countryPhoneCodes={countryPhoneCodes}
        onCountryPhoneCodeClick={onCountryPhoneCodeClick}
        setValue={setValue}
        watch={watch}
      />
    </fieldset>
  );
}
