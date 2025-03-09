"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import AddressForm from "@/app/ui/shipping/AddressForm";
import { AddressType } from "@/app/checkout/models";

interface Props {
  allCountries: string[];
  getCountriesForQuery: (query: string) => Promise<string[]>;
}

export default function AddressFormsContainer({
  allCountries,
  getCountriesForQuery,
}: Props) {
  const [suggestedCountries, setSuggestedCountries] =
    useState<string[]>(allCountries);
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

  const billingAddressRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (!formData.isBillingAddressSame && billingAddressRef.current) {
      billingAddressRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [formData.isBillingAddressSame]);

  const onCheckboxChange = () => {
    setFormData((prevState) => {
      const isBillingAddressSame = !prevState.isBillingAddressSame;

      return {
        ...prevState,
        isBillingAddressSame,
      };
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
      const foundCountries: string[] = await getCountriesForQuery(value);
      setSuggestedCountries(foundCountries);
    } else {
      setSuggestedCountries(allCountries);
    }
    console.log("found countries: ", suggestedCountries);
  }

  function onSuggestedCountryClick(country: string, addressType: AddressType) {
    setFormData({
      ...formData,
      [addressType]: { ...formData[addressType], country: country },
    });
  }

  return (
    <section>
      <AddressForm
        addressType="shipping"
        addressData={formData.shipping}
        suggestedCountries={suggestedCountries}
        onCountryInputChange={onCountryInputChange}
        onInputChange={onInputChange}
        onCheckboxChange={onCheckboxChange}
        onSuggestedCountryClick={onSuggestedCountryClick}
        isBillingAddressSame={formData.isBillingAddressSame}
      />
      {!formData.isBillingAddressSame && (
        <AddressForm
          ref={billingAddressRef}
          addressType="billing"
          addressData={formData.billing}
          suggestedCountries={suggestedCountries}
          onCountryInputChange={onCountryInputChange}
          onInputChange={onInputChange}
          onSuggestedCountryClick={onSuggestedCountryClick}
        />
      )}
    </section>
  );
}
