import { AddressType } from "@/app/checkout/models";
import { ChangeEvent, useState } from "react";

interface Props {
  suggestedCountries: string[];
  addressType: AddressType;
  country: string;
  onCountryInputChange: (
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onCountryClick: (country: string, addressType: AddressType) => void;
}

export default function CountriesDatalist({
  suggestedCountries,
  addressType,
  country,
  onCountryInputChange,
  onCountryClick,
}: Props) {
  const [datalistIsShown, setDatalistIsShown] = useState(false);

  return (
    <section
      className="relative flex flex-col gap-2"
      onBlur={() => {
        setDatalistIsShown(false);
        console.log("section blur");
      }}
    >
      <label htmlFor={`${addressType}-country`}>Country / Territory</label>
      <input
        id={`${addressType}-country`}
        name="country"
        autoComplete="off"
        value={country}
        onClick={() => setDatalistIsShown(true)}
        onChange={(event) => onCountryInputChange(addressType, event)}
        type="text"
        className="border border-black w-112 py-1 px-2 rounded-md"
      />
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
