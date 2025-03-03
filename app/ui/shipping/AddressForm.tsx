import { ChangeEvent } from "react";
import { AddressType } from "@/app/checkout/models";

type AddressData = {
  name: string;
  address: string;
  zip: string;
  region: string;
  country: string;
  tel: string;
};

interface Props {
  addressType: AddressType;
  addressData: AddressData;
  countries: string[];
  onCountryInputChange: (
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onInputChange: (
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}

export default function AddressForm({
  addressType,
  addressData,
  countries,
  onCountryInputChange,
  onInputChange,
}: Props) {
  return (
    <section>
      <h1 className="capitalize">{addressType} address</h1>
      <section>
        <label htmlFor={`${addressType}-name`}>Full Name</label>
        <input
          id={`${addressType}-name`}
          name="name"
          autoComplete="name"
          value={addressData.name}
          onChange={(event) => onInputChange(addressType, event)}
          type="text"
          className="border border-black"
        />
      </section>
      <section>
        <label htmlFor={`${addressType}-address`}>Address</label>
        <input
          id={`${addressType}-address`}
          name="address"
          autoComplete="street-address"
          value={addressData.address}
          onChange={(event) => onInputChange(addressType, event)}
          type="textarea"
          className="border border-black"
        />
      </section>
      <section>
        <label htmlFor={`${addressType}-zip`}>ZIP / Postal Code</label>
        <input
          id={`${addressType}-zip`}
          name="zip"
          autoComplete="postal-code"
          value={addressData.zip}
          onChange={(event) => onInputChange(addressType, event)}
          type="text"
          className="border border-black"
        />
      </section>
      <section>
        <label htmlFor={`${addressType}-region`}>
          State / Region / Province (optional)
        </label>
        <input
          id={`${addressType}-region`}
          name="region"
          autoComplete="address-level1"
          value={addressData.region}
          onChange={(event) => onInputChange(addressType, event)}
          type="text"
          className="border border-black"
        />
      </section>
      <section>
        <label htmlFor={`${addressType}-country`}>Country / Territory</label>
        <input
          id={`${addressType}-country`}
          name="country"
          autoComplete="country"
          value={addressData.country}
          list="country-names"
          onChange={(event) => onCountryInputChange(addressType, event)}
          className="border border-black"
        />
        <datalist id="country-names">
          {countries.map((country: string) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </section>
      <section>
        {/*TODO: Add "Why do we need this information?"*/}
        <label htmlFor={`${addressType}-tel`}>Phone</label>
        <input
          id={`${addressType}-tel`}
          name="tel"
          autoComplete="tel"
          value={addressData.tel}
          onChange={(event) => onInputChange(addressType, event)}
          type="tel"
          className="border border-black"
        />
      </section>
    </section>
  );
}
