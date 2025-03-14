import { ChangeEvent, Ref } from "react";
import {
  AddressData,
  AddressType,
  CombinedAddressFormData,
  CountriesInfo,
} from "@/app/checkout/models";
import { clsx } from "clsx";
import CountriesDatalist from "@/app/ui/shipping/CountriesDatalist";
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
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
  onCheckboxChange?: () => void;
  onSuggestedCountryClick: (country: string, addressType: AddressType) => void;
  isBillingAddressSame?: boolean;
  register: UseFormRegister<CombinedAddressFormData>;
  watch: UseFormWatch<CombinedAddressFormData>;
  errors: FieldErrors<CombinedAddressFormData>;
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

export default function AddressForm({
  ref = null,
  addressType,
  suggestedCountries,
  countryPhoneCodes,
  onCountryInputChange,
  onCheckboxChange,
  onSuggestedCountryClick,
  isBillingAddressSame = undefined,
  register,
  watch,
  errors,
}: Props) {
  const country = watch(`${addressType}.country`);

  function getErrorMessage(fieldName: FieldNameType) {
    return errors[addressType]?.[fieldName]?.message || null;
  }

  return (
    <fieldset className="flex flex-col gap-4" ref={ref}>
      <h1 className="text-3xl mb-4">
        <span className="capitalize">{addressType}</span> address
      </h1>
      <Input
        name="email"
        labelText="Email"
        addressType={addressType}
        register={register}
        autoComplete="email"
        type="email"
        getErrorMessage={getErrorMessage}
      />
      <Input
        name="name"
        labelText="Full name"
        addressType={addressType}
        register={register}
        autoComplete="name"
        type="text"
        getErrorMessage={getErrorMessage}
      />

      <Input
        name="address"
        labelText="Address"
        addressType={addressType}
        register={register}
        autoComplete="street-address"
        type="text"
        getErrorMessage={getErrorMessage}
      />
      <Input
        name="zip"
        labelText="ZIP / Postal code"
        addressType={addressType}
        register={register}
        autoComplete="postal-code"
        type="text"
        getErrorMessage={getErrorMessage}
      />
      <Input
        name="region"
        labelText="State / Province (optional)"
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
        name="phone"
        labelText="Phone"
        addressType={addressType}
        register={register}
        autoComplete="tel"
        type="tel"
        getErrorMessage={getErrorMessage}
        countryPhoneCodes={countryPhoneCodes}
      />
      {addressType === "shipping" && (
        <section className="flex gap-2">
          <input
            id="billing-address-same"
            name="billing-address-same"
            type="checkbox"
            checked={isBillingAddressSame}
            onChange={onCheckboxChange}
            className="w-5 h-5"
          />
          <label htmlFor="billing-address-same">
            Billing address is the same
          </label>
        </section>
      )}
    </fieldset>
  );
}
