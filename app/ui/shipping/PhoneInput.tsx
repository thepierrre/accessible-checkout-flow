import { UseFormRegister } from "react-hook-form";

import {
  AddressType,
  CombinedAddressFormData,
  CountriesInfo,
} from "@/app/checkout/models";
import { FieldNameType } from "@/app/ui/shipping/AddressForm";
import { ChangeEvent, useState } from "react";

interface Props {
  name: FieldNameType;
  labelText: string;
  addressType: AddressType;
  register: UseFormRegister<CombinedAddressFormData>;
  autoComplete: string;
  type: "text" | "tel" | "email";
  getErrorMessage: (fieldName: FieldNameType) => string | null;
  onChange?: (
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onClick?: () => void;
  countryPhoneCodes: CountriesInfo;
}

export default function PhoneInput({
  name,
  labelText,
  addressType,
  register,
  autoComplete,
  type,
  getErrorMessage,
  onChange,
  onClick,
  countryPhoneCodes,
}: Props) {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [datalistIsShown, setDatalistIsShown] = useState<boolean>(false);
  const errorMessage = getErrorMessage(name);

  return (
    <section className="flex flex-col gap-1">
      <div
        className="flex gap-2 align-center"
        onPointerLeave={() => setIsMouseOver(false)}
      >
        <label htmlFor={`${addressType}-${name}`} className="font-semibold">
          {labelText}
        </label>
      </div>
      <div>
        <div className="flex items-center">
          <button
            id="dropdown-phone-button"
            data-dropdown-toggle="dropdown-phone"
            className="shrink-0 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900  border border-black rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
            type="button"
            onClick={() => setDatalistIsShown(true)}
          >
            +1
            <svg
              className="w-2 h-2 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {datalistIsShown && (
            <ul
              className="absolute bg-white shadow-md shadow-gray-400 rounded-md bottom-40 overflow-y-auto py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-phone-button"
            >
              {countryPhoneCodes.map((country: string) => (
                <li key={country}>
                  <button
                    type="button"
                    className="inline-flex w-112 px-4 py-2 text-sm hover:bg-gray-100 text-black"
                    role="menuitem"
                  >
                    <span className="inline-flex items-center">
                      `${country} (+${country.phoneCodes[0]})`
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <label
            htmlFor="phone-input"
            className="mb-2 text-sm font-medium sr-only"
          >
            Phone number:
          </label>
          <input
            type="text"
            id="phone-input"
            className="block p-2 w-full text-sm text-gray-900 rounded-e-lg border-s-0 border border-black focus:ring-blue-500 focus:border-blue-500"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder=""
          />
        </div>
        {/*<div className="flex absolute bottom-66 left-100 w-10 h-8 pl-2">*/}
        {/*  <div className="flag:DE self-center rounded-sm"></div>*/}
        {/*</div>*/}
        {/*<input*/}
        {/*  id={`${addressType}-${name}`}*/}
        {/*  {...register(`${addressType}.${name}`)}*/}
        {/*  onChange={(event) => onChange && onChange(addressType, event)}*/}
        {/*  onClick={onClick && onClick}*/}
        {/*  autoComplete={autoComplete}*/}
        {/*  type={type}*/}
        {/*  className="border border-black w-112 h-8 py-1 px-2 rounded-md pl-12"*/}
        {/*/>*/}
      </div>

      {errorMessage && (
        <p className="text-red-500 animate-in fade-in duration-700 text-sm">
          {errorMessage}
        </p>
      )}
    </section>
  );
}
