"use client";

import { ChangeEvent, useState } from "react";
import AddressForm from "@/app/ui/shipping/AddressForm";
import { AddressType } from "@/app/checkout/models";

interface Props {
  getCountries: (query: string) => Promise<string[]>;
}

export default function AddressFormsContainer({ getCountries }: Props) {
  const [countries, setCountries] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    shipping: {
      name: "",
      address: "",
      zip: "",
      region: "",
      country: "",
      tel: "",
    },
    billing: {
      name: "",
      address: "",
      zip: "",
      region: "",
      country: "",
      tel: "",
    },
    isBillingAddressSame: true,
  });

  const onCheckboxChange = () => {
    setFormData({
      ...formData,
      isBillingAddressSame: !formData.isBillingAddressSame,
    });
  };

  const onInputChange = (
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name, type } = event.target;
    console.log(value, name, type);
    setFormData({
      ...formData,
      [addressType]: { ...formData[addressType], [name]: value },
    });
  };

  async function onCountryInputChange(
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { value } = event.target;
    setFormData({
      ...formData,
      [addressType]: { ...formData[addressType], country: value },
    });
    if (value) {
      const foundCountries = await getCountries(value);
      setCountries(foundCountries);
    }
  }

  return (
    <>
      <form id="address-form" name="address-form">
        <AddressForm
          addressType="shipping"
          addressData={formData.shipping}
          countries={countries}
          onCountryInputChange={onCountryInputChange}
          onInputChange={onInputChange}
          onCheckboxChange={onCheckboxChange}
          isBillingAddressSame={formData.isBillingAddressSame}
        />
        {!formData.isBillingAddressSame && (
          <AddressForm
            addressType="billing"
            addressData={formData.billing}
            countries={countries}
            onCountryInputChange={onCountryInputChange}
            onInputChange={onInputChange}
          />
        )}
      </form>
    </>
  );
}
