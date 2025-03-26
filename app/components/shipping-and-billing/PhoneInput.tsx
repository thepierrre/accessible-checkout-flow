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
import {
  ChangeEvent,
  useEffect,
  useState,
  use,
  useCallback,
  useRef,
} from "react";
import { clsx } from "clsx";
import { getCountryPhoneCodes } from "@/app/lib/actions";

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
  //countryPhoneCodes: CountriesInfo;
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
  getErrorMessage,
  //countryPhoneCodes,
  // onCountryPhoneCodeClick,
  setValue,
  watch,
}: Props) {
  const queryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [suggestedCountriesWithCodes, setSuggestedCountriesWithCodes] =
    useState<CountriesInfo>({});
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [datalistIsShown, setDatalistIsShown] = useState<boolean>(false);
  const [countryQuery, setCountryQuery] = useState<string>("");
  const [selectedPhoneCode, setSelectedPhoneCode] = useState<string>("1");

  const phoneCodeErrorMessage = getErrorMessage("phoneCode");
  const phoneNumberErrorMessage = getErrorMessage("phoneNumber");

  function onCountryPhoneCodeClick(phoneCode: string) {
    console.log("selected phone code", phoneCode);
    setSelectedPhoneCode(phoneCode);
    setValue(`${addressType}.phoneCode`, phoneCode);
    setDatalistIsShown(false);
  }

  useEffect(() => {
    async function fetchPhoneCodes() {
      const countryPhoneCodes = await getCountryPhoneCodes();
      setSuggestedCountriesWithCodes(countryPhoneCodes);
      console.log(countryPhoneCodes);
    }

    fetchPhoneCodes();
  }, []);

  const handleCountryOrCodeQuery = useCallback(
    (event: KeyboardEvent) => {
      console.log(countryQuery);
      console.log(suggestedCountriesWithCodes);

      const filteredCountries: CountriesInfo = suggestedCountriesWithCodes
        ? Object.fromEntries(
            Object.keys(suggestedCountriesWithCodes)
              .filter((country) =>
                country.toLowerCase().startsWith(countryQuery),
              )
              .map((country) => [
                country,
                suggestedCountriesWithCodes[country],
              ]),
          )
        : {};

      console.log(filteredCountries);

      setSuggestedCountriesWithCodes(filteredCountries);

      if (queryTimeoutRef.current) {
        clearTimeout(queryTimeoutRef.current);
      }

      queryTimeoutRef.current = setTimeout(() => {
        setCountryQuery("");
        queryTimeoutRef.current = null;
      }, 300);
    },
    [suggestedCountriesWithCodes],
  );

  useEffect(() => {
    if (datalistIsShown) {
      window.addEventListener("keypress", handleCountryOrCodeQuery);
    } else {
      window.removeEventListener("keypress", handleCountryOrCodeQuery);
    }

    return () => {
      window.removeEventListener("keypress", handleCountryOrCodeQuery);
    };

    // if datalist is shown, add event listener
    // remove event listener if datalist is closed / if the phone code is chosen
  }, [datalistIsShown, handleCountryOrCodeQuery]);

  return (
    <section className="flex flex-col gap-0.5">
      <div
        className="flex gap-2 align-center"
        onPointerLeave={() => setIsMouseOver(false)}
      >
        <label htmlFor={`${addressType}-phone`} className="font-medium">
          {labelText}
        </label>
      </div>
      <div
        className="flex items-center"
        onBlur={() => {
          setDatalistIsShown(false);
          setCountryQuery("");
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
            className="absolute bg-white shadow-md z-50 shadow-gray-400 rounded-md bottom-5 overflow-y-auto py-2 text-sm text-black-primary max-h-44"
            aria-labelledby="dropdown-phone-button"
          >
            {suggestedCountriesWithCodes &&
              Object.keys(suggestedCountriesWithCodes).map((country) => {
                const phoneCode =
                  suggestedCountriesWithCodes[country][0].toString();
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
          placeholder="123456789"
          {...register(`${addressType}.phoneNumber`)}
        />
      </div>
      <p
        className={clsx(
          "overflow-hidden transition-[max-height] text-red-primary text-sm duration-700",
          phoneCodeErrorMessage ? "max-h-8" : "max-h-0",
        )}
      >
        {phoneCodeErrorMessage || "\u00A0"}
      </p>
      <p
        className={clsx(
          "overflow-hidden transition-[max-height] text-red-primary text-sm duration-700",
          phoneNumberErrorMessage ? "max-h-8" : "max-h-0",
        )}
      >
        {phoneNumberErrorMessage || "\u00A0"}
      </p>
    </section>
  );
}
