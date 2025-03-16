import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import {
  AddressType,
  CombinedAddressFormData,
  CountriesInfo,
} from "@/app/checkout/models";
import { FieldNameType } from "@/app/components/shipping-and-billing/AddressForm";
import { ChangeEvent, useEffect, useState } from "react";
import { clsx } from "clsx";

interface Props {
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
  onCountryPhoneCodeClick: (
    phoneCodeNum: number,
    addressType: AddressType,
  ) => void;
  setValue: UseFormSetValue<CombinedAddressFormData>;
  watch: UseFormWatch<CombinedAddressFormData>;
}

export default function PhoneInput({
  labelText,
  addressType,
  register,
  autoComplete,
  type,
  getErrorMessage,
  onChange,
  onClick,
  countryPhoneCodes,
  // onCountryPhoneCodeClick,
  setValue,
  watch,
}: Props) {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [datalistIsShown, setDatalistIsShown] = useState<boolean>(false);
  const [selectedPhoneCode, setSelectedPhoneCode] = useState<string>("1");

  const phoneCodeErrorMessage = getErrorMessage("phoneCode");
  const phoneNumberErrorMessage = getErrorMessage("phoneNumber");

  const formPhoneCode = watch(`${addressType}.phoneCode`, selectedPhoneCode);

  useEffect(() => {
    if (formPhoneCode && formPhoneCode !== selectedPhoneCode) {
      setSelectedPhoneCode(formPhoneCode);
    }
  }, [formPhoneCode, selectedPhoneCode]);

  function onCountryPhoneCodeClick(phoneCode: string) {
    console.log("selected phone code", phoneCode);
    setSelectedPhoneCode(phoneCode);
    setValue(`${addressType}.phoneCode`, phoneCode);
    setDatalistIsShown(false);
  }

  return (
    <section className="flex flex-col gap-1">
      <div
        className="flex gap-2 align-center"
        onPointerLeave={() => setIsMouseOver(false)}
      >
        <label
          htmlFor={`${addressType}-phone`}
          className="font-medium after:content-['*']"
        >
          {labelText}
        </label>
      </div>

      <div
        className="flex items-center"
        onBlur={() => {
          setDatalistIsShown(false);
          console.log("section blur");
        }}
      >
        <button
          id="dropdown-phone-button"
          data-dropdown-toggle="dropdown-phone"
          className={clsx(
            "min-w-18 inline-flex items-center py-2 px-4 h-8 text-sm font-medium text-center text-black-primary  border border-gray-700 rounded-s-lg hover:bg-gray-200 focus:outline-none focus:outline-1 focus:outline-offset-0",
            phoneNumberErrorMessage
              ? "border-red-primary focus:outline-red-primary"
              : "border-gray-700 focus:outline-blue-semidark",
          )}
          type="button"
          onClick={() => setDatalistIsShown(true)}
        >
          +{selectedPhoneCode}
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
            className="absolute bg-white shadow-md z-50 shadow-gray-400 rounded-md bottom-16 overflow-y-auto py-2 text-sm text-black-primary max-h-44"
            aria-labelledby="dropdown-phone-button"
          >
            {Object.keys(countryPhoneCodes).map((country) => {
              const phoneCode = countryPhoneCodes[country][0].toString();
              return (
                <li key={`${country}=${phoneCode}`}>
                  <button
                    type="button"
                    className="inline-flex w-112 px-4 py-2 text-sm hover:bg-gray-100 text-black-primary"
                    role="menuitem"
                    onMouseDown={() => {
                      onCountryPhoneCodeClick(phoneCode);
                    }}
                  >
                    <span className="inline-flex items-center">
                      {country} (+{phoneCode})
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <label
          htmlFor="phone-input"
          className="mb-2 text-sm font-semibold sr-only antialiased"
        >
          Phone number:
        </label>
        <input
          type="tel"
          id="phone-input"
          autoComplete="tel"
          className={clsx(
            "block p-2 h-8 grow text-sm text-gray-900 rounded-e-lg border-s-0 border border-gray-700 focus:outline-none focus:outline-1 focus:outline-offset-0",
            phoneNumberErrorMessage
              ? "border-red-primary focus:outline-red-primary"
              : "border-gray-700 focus:outline-blue-semidark",
          )}
          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123456789"
          {...register(`${addressType}.phoneNumber`)}
        />
      </div>
      {phoneCodeErrorMessage && (
        <p className="text-red-primary animate-in fade-in duration-700 text-sm">
          {phoneCodeErrorMessage}
        </p>
      )}
      {phoneNumberErrorMessage && (
        <p className="text-red-primary animate-in fade-in duration-700 text-sm">
          {phoneNumberErrorMessage}
        </p>
      )}
    </section>
  );
}
