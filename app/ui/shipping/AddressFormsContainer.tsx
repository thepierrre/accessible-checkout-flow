"use client";

import { ChangeEvent, useState } from "react";
import AddressForm from "@/app/ui/shipping/AddressForm";
import { AddressType } from "@/app/checkout/models";

interface Props {
  getCountries: (query: string) => Promise<string[]>;
}

export default function AddressFormsContainer({ getCountries }: Props) {
  const [suggestedCountries, setSuggestedCountries] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    shipping: {
      name: "",
      address: "",
      zip: "",
      region: "",
      country: "",
      tel: "",
      email: "",
    },
    billing: {
      name: "",
      address: "",
      zip: "",
      region: "",
      country: "",
      tel: "",
      email: "",
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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = event.target;
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
      setSuggestedCountries(foundCountries);
    } else {
      setSuggestedCountries([]);
    }
    console.log("found countries: ", suggestedCountries);
  }

  return (
    <>
      <AddressForm
        addressType="shipping"
        addressData={formData.shipping}
        suggestedCountries={suggestedCountries}
        onCountryInputChange={onCountryInputChange}
        onInputChange={onInputChange}
        onCheckboxChange={onCheckboxChange}
        isBillingAddressSame={formData.isBillingAddressSame}
      />
      {!formData.isBillingAddressSame && (
        <AddressForm
          addressType="billing"
          addressData={formData.billing}
          suggestedCountries={suggestedCountries}
          onCountryInputChange={onCountryInputChange}
          onInputChange={onInputChange}
        />
      )}
    </>
  );
}
