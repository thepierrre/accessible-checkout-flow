import { AddressType, CombinedAddressFormData } from "@/app/checkout/models";
import { ChangeEvent, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FieldNameType } from "@/app/components/shipping-and-billing/AddressForm";
import Input from "@/app/components/shipping-and-billing/Input";

interface Props {
  suggestedCountries: string[];
  addressType: AddressType;
  country: string;
  onCountryInputChange: (
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onCountryClick: (country: string, addressType: AddressType) => void;
  register: UseFormRegister<CombinedAddressFormData>;
  getErrorMessage: (fieldName: FieldNameType) => string | null;
}

export default function CountriesDatalist({
  suggestedCountries,
  addressType,
  onCountryInputChange,
  onCountryClick,
  register,
  getErrorMessage,
}: Props) {
  const [datalistIsShown, setDatalistIsShown] = useState(false);

  function handleInputClick() {
    setDatalistIsShown(true);
  }

  return (
    <section
      className="relative flex flex-col gap-2"
      onBlur={() => {
        setDatalistIsShown(false);
        console.log("section blur");
      }}
    >
      <Input
        name="country"
        labelText="Country/Territory"
        placeholder="Germany"
        addressType={addressType}
        register={register}
        autoComplete="country"
        type="text"
        getErrorMessage={getErrorMessage}
        onChange={onCountryInputChange}
        onClick={handleInputClick}
      />

      {datalistIsShown && (
        <ul
          id="countries-list"
          className="absolute w-112 z-50 top-16 max-h-44 py-2 overflow-y-auto text-sm bg-white flex flex-col shadow-md shadow-gray-400 rounded-md "
        >
          {suggestedCountries.length > 0 ? (
            suggestedCountries.map((country) => (
              <li
                key={country}
                value={country}
                onMouseDown={() => {
                  onCountryClick(country, addressType);
                  console.log("after country click");
                  setDatalistIsShown(false);
                  console.log("after hiding datalist: ", datalistIsShown);
                }}
                className="px-4 py-2  hover:bg-gray-100"
              >
                {country}
              </li>
            ))
          ) : (
            <p className="px-4 py-2">No matching countries</p>
          )}
        </ul>
      )}
    </section>
  );
}
