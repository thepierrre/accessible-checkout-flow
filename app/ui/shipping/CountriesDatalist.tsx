import { AddressType, CombinedAddressFormData } from "@/app/checkout/models";
import { ChangeEvent, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FieldNameType } from "@/app/ui/shipping/AddressForm";
import Input from "@/app/ui/shipping/Input";

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
        labelText="Country / Territory"
        addressType={addressType}
        register={register}
        autoComplete="country"
        type="text"
        getErrorMessage={getErrorMessage}
        onChange={onCountryInputChange}
        onClick={handleInputClick}
      />
      {/*<label htmlFor={`${addressType}-country`}>Country / Territory</label>*/}
      {/*<input*/}
      {/*  id={`${addressType}-country`}*/}
      {/*  {...register(`${addressType}.country`)}*/}
      {/*  autoComplete="off"*/}
      {/*  //value={country}*/}
      {/*  onClick={() => setDatalistIsShown(true)}*/}
      {/*  onChange={(event) => onCountryInputChange(addressType, event)}*/}
      {/*  type="text"*/}
      {/*  className="border border-black w-112 py-1 px-2 rounded-md"*/}
      {/*/>*/}
      {datalistIsShown && (
        <ul
          id="countries-list"
          className="absolute w-112 top-20 max-h-44 overflow-y-auto bg-white flex flex-col shadow-md shadow-gray-400 rounded-md p-4 gap-4"
        >
          {suggestedCountries.map((country) => (
            <li
              key={country}
              value={country}
              onMouseDown={() => {
                onCountryClick(country, addressType);
                console.log("after country click");
                setDatalistIsShown(false);
                console.log("after hiding datalist: ", datalistIsShown);
              }}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
