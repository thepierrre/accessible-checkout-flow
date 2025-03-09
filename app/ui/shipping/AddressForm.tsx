import { ChangeEvent } from "react";
import { AddressData, AddressType } from "@/app/checkout/models";
import { clsx } from "clsx";

// FIXME: This is temporary. Export the inputs to a reusable component.
const classNames = {
  input: "border border-black w-112 py-1 px-2 rounded-md",
};

type AddressData = {
  name: string;
  address: string;
  zip: string;
  region: string;
  country: string;
  tel: string;
  email: string;
};

interface Props {
  addressType: AddressType;
  addressData: AddressData;
  suggestedCountries: string[];
  onCountryInputChange: (
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onInputChange: (
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onCheckboxChange?: () => void;
  onSuggestedCountryClick: (country: string, addressType: AddressType) => void;
  isBillingAddressSame?: boolean;
}

export default function AddressForm({
  addressType,
  addressData,
  suggestedCountries,
  onCountryInputChange,
  onInputChange,
  onCheckboxChange,
  onSuggestedCountryClick,
  isBillingAddressSame = undefined,
}: Props) {
  const { input } = classNames;

  return (
    <form
      id={`${addressType}-address-form`}
      name={`${addressType}-address-form`}
      className="flex flex-col gap-4"
    >
      <h1 className="text-3xl mb-4">
        <span className="capitalize">{addressType}</span> address
      </h1>
      <section className="flex flex-col gap-2">
        <label htmlFor={`${addressType}-name`}>Full name</label>
        <input
          id={`${addressType}-name`}
          name="name"
          autoComplete="name"
          value={addressData.name}
          onChange={(event) => onInputChange(addressType, event)}
          type="text"
          className={input}
        />
      </section>
      <section className="flex flex-col gap-2">
        <label htmlFor={`${addressType}-address`}>Address</label>
        <textarea
          id={`${addressType}-address`}
          name="address"
          autoComplete="street-address"
          value={addressData.address}
          onChange={(event) => onInputChange(addressType, event)}
          className={clsx(input, "h-20")}
        />
      </section>
      <section className="flex flex-col gap-2">
        <label htmlFor={`${addressType}-zip`}>ZIP / Postal code</label>
        <input
          id={`${addressType}-zip`}
          name="zip"
          autoComplete="postal-code"
          value={addressData.zip}
          onChange={(event) => onInputChange(addressType, event)}
          type="text"
          className={input}
        />
      </section>
      <section className="flex flex-col gap-2">
        <label htmlFor={`${addressType}-region`}>
          State / Province (optional)
        </label>
        <input
          id={`${addressType}-region`}
          name="region"
          autoComplete="address-level1"
          value={addressData.region}
          onChange={(event) => onInputChange(addressType, event)}
          type="text"
          className={input}
        />
      </section>
      <section className="relative flex flex-col gap-2">
        <label htmlFor={`${addressType}-country`}>Country / Territory</label>
        <input
          id={`${addressType}-country`}
          name="country"
          autoComplete="country"
          value={addressData.country}
          onChange={(event) => onCountryInputChange(addressType, event)}
          type="text"
          className={input}
        />
        {suggestedCountries.length > 0 && (
          <ul className="absolute w-112 top-20 max-h-44 overflow-y-auto bg-white flex flex-col shadow-md shadow-gray-400 rounded-md p-4 gap-4">
            {suggestedCountries.map((country) => (
              <li
                key={country}
                onClick={() => onSuggestedCountryClick(country, addressType)}
              >
                {country}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="flex flex-col gap-2">
        {/*TODO: Add "Why do we need this information?"*/}
        <label htmlFor={`${addressType}-tel`}>Phone</label>
        <input
          id={`${addressType}-tel`}
          name="tel"
          autoComplete="tel"
          value={addressData.tel}
          onChange={(event) => onInputChange(addressType, event)}
          type="tel"
          className={input}
        />
      </section>
      <section className="flex flex-col gap-2">
        <label htmlFor={`${addressType}-email`}>Email</label>
        <input
          id={`${addressType}-email`}
          name="email"
          autoComplete="email"
          value={addressData.email}
          onChange={(event) => onInputChange(addressType, event)}
          type="text"
          className={input}
        />
      </section>
      {addressType === "shipping" && (
        <section className="flex gap-2">
          <input
            id="billing-address-same"
            name="billing-address-same"
            type="checkbox"
            checked={isBillingAddressSame}
            onChange={onCheckboxChange}
          />
          <label htmlFor="billing-address-same">Use as Billing Address</label>
        </section>
      )}
    </form>
  );
}
