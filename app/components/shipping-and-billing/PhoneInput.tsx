import {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";

import questionIcon from "../../../public/icons/questionIcon.svg";

import {
    AddressType,
    CombinedAddressFormData,
    CountriesWithCodes,
} from "@/app/checkout/models";
import {FieldNameType} from "@/app/components/shipping-and-billing/AddressForm";
import {ChangeEvent, useEffect, useState, useCallback, useRef, useId} from "react";
import {clsx} from "clsx";
import Image from "next/image";
import {
    getCountryMatchesForNames,
    getCountryMatchesForPhoneCodes,
} from "@/app/lib/countryQueries";
import Tooltip from "@/app/components/shared/Tooltip";
import ChevronDownIcon from "@/app/components/shared/ChevronDownIcon";

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
    countriesWithCodes: CountriesWithCodes;
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
                                       countriesWithCodes,
                                       // onCountryPhoneCodeClick,
                                       setValue,
                                       watch,
                                   }: Props) {
    const tooltipId = useId();
    const inputId = useId();
    const countryQueryRef = useRef<string>("");
    const queryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [suggestedCountriesWithCodes, setSuggestedCountriesWithCodes] =
        useState<CountriesWithCodes>(countriesWithCodes);
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

    function handleDatasetOpening() {
        setDatalistIsShown(true);
        setSuggestedCountriesWithCodes(countriesWithCodes);
    }

    function handleDatasetClose() {
        setDatalistIsShown(false);
        setCountryQuery("");
        countryQueryRef.current = "";
        console.log("section blur");
    }

    const handleCountryOrCodeQuery = useCallback(
        (event: KeyboardEvent) => {
            const updatedQuery = (countryQueryRef.current + event.key).toLowerCase();
            countryQueryRef.current = updatedQuery;
            setCountryQuery(updatedQuery);

            console.log("countryQueryRefCurrent:", countryQueryRef.current);

            const filteredCountries = isNaN(+updatedQuery)
                ? getCountryMatchesForNames(suggestedCountriesWithCodes, updatedQuery)
                : getCountryMatchesForPhoneCodes(
                    suggestedCountriesWithCodes,
                    updatedQuery,
                );

            setSuggestedCountriesWithCodes(filteredCountries);

            if (queryTimeoutRef.current) {
                clearTimeout(queryTimeoutRef.current);
            }

            queryTimeoutRef.current = setTimeout(() => {
                countryQueryRef.current = "";
                setCountryQuery("");
                queryTimeoutRef.current = null;
            }, 300);
        },
        [countryQuery, suggestedCountriesWithCodes],
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
    }, [datalistIsShown]);

    return (
        <section className="flex flex-col gap-0.5">
            <div
                className="align-center flex gap-2"
                onPointerLeave={() => setIsMouseOver(false)}
            >
                <div className="relative flex gap-1">
                    <label htmlFor={`${addressType}-phone`} className="font-medium">
                        {labelText}
                    </label>
                    <Tooltip label="Used only if there's an issue." position="right" id={tooltipId}>
                        {(triggerProps) => (
                            <Image
                                src={questionIcon}
                                alt=""
                                className="w-5"
                                tabIndex={0}
                                {...triggerProps}
                            />)}

                    </Tooltip>

                </div>
            </div>
            <div className="relative flex items-center" onBlur={handleDatasetClose}>
                <button
                    id="dropdown-phone-button"
                    data-dropdown-toggle="dropdown-phone"
                    className={clsx(
                        "min-w-18 inline-flex h-8 items-center rounded-s-lg border px-4 py-2 text-center text-sm font-medium text-black-primary hover:bg-gray-200 focus:z-10 focus:outline-none focus:outline-1 focus:outline-offset-0",
                        phoneNumberErrorMessage
                            ? "border-red-primary focus:outline-red-primary"
                            : "border-gray-700 focus:outline-blue-semidark",
                    )}
                    type="button"
                    onClick={handleDatasetOpening}
                >
                    +{selectedPhoneCode}
                    <ChevronDownIcon/>
                </button>
                {datalistIsShown && (
                    <ul
                        className="absolute top-9 z-50 max-h-44 overflow-y-auto rounded-md bg-white py-2 text-sm text-black-primary shadow-md shadow-gray-400"
                        aria-labelledby="dropdown-phone-button"
                    >
                        {Object.keys(suggestedCountriesWithCodes).length > 0 ? (
                            Object.keys(suggestedCountriesWithCodes).map((country) => {
                                const phoneCode =
                                    suggestedCountriesWithCodes[country].toString();
                                return (
                                    <li key={`${country}=${phoneCode}`}>
                                        <button
                                            type="button"
                                            className="inline-flex w-112 px-4 py-2 text-sm text-black-primary hover:bg-gray-100"
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
                            })
                        ) : (
                            <li>
                                <p className="inline-flex w-112 px-4 py-2 text-sm text-black-primary">
                                    No matching countries.
                                </p>
                            </li>
                        )}
                    </ul>
                )}
                <label
                    htmlFor={inputId}
                    className="sr-only mb-2 text-sm font-semibold antialiased"
                >
                    Phone number:
                </label>
                <input
                    type="tel"
                    id={inputId}
                    autoComplete="tel"
                    className={clsx(
                        "relative h-8 grow rounded-e-lg border border-s-0 border-gray-700 p-2 text-sm text-gray-900 focus:outline-none focus:outline-1 focus:outline-offset-0",
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
                    "overflow-hidden text-sm text-red-primary transition-[max-height] duration-700",
                    phoneCodeErrorMessage ? "max-h-8" : "max-h-0",
                )}
            >
                {phoneCodeErrorMessage || "\u00A0"}
            </p>
            <p
                className={clsx(
                    "overflow-hidden text-sm text-red-primary transition-[max-height] duration-700",
                    phoneNumberErrorMessage ? "max-h-8" : "max-h-0",
                )}
            >
                {phoneNumberErrorMessage || "\u00A0"}
            </p>
        </section>
    );
}
