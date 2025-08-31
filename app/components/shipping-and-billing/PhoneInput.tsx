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
import useListboxNavigation from "@/app/hooks/useListboxNavigation";
import useElementWidth from "@/app/hooks/useElementWidth";

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
                                   }: Props) {
    const tooltipId = useId();
    const inputId = useId();
    const listId = useId();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const countryQueryRef = useRef<string>("");
    const queryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [suggestedCountriesWithCodes, setSuggestedCountriesWithCodes] =
        useState<CountriesWithCodes>(countriesWithCodes);
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
    const divWrapperRef = useRef<HTMLDivElement | null>(null);
    const divWrapperWidth = useElementWidth(divWrapperRef);
    const [datalistIsShown, setDatalistIsShown] = useState<boolean>(false);
    const [countryQuery, setCountryQuery] = useState<string>("");
    const [selectedPhoneCode, setSelectedPhoneCode] = useState<string>("1");
    const {
        activeIndex,
        setActiveIndex,
        handleKeyDown
    } = useListboxNavigation({
        options: Object.keys(suggestedCountriesWithCodes),
        onSelect: () => {
            onCountryPhoneCodeClick(selectedPhoneCode);
            setDatalistIsShown(false);
            buttonRef.current?.focus();
        },
        onTab: () => {
            onCountryPhoneCodeClick(selectedPhoneCode);
            setDatalistIsShown(false);
        },
        onCancel: () => {
            setValue(`${addressType}.country`, "", {shouldValidate: true});
            setActiveIndex(-1);
            setDatalistIsShown(false);
            buttonRef.current?.focus();
        },
        isOpen: datalistIsShown,
        onOpen: () => {
            setDatalistIsShown(true);
        }
    })

    useEffect(() => {
        if (!datalistIsShown) return;
        const el = optionRefs.current[activeIndex];
        if (!el) return;
        el.scrollIntoView({block: "nearest"});

    }, [datalistIsShown, activeIndex]);


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
        console.log("active index", activeIndex);
    }

    function handleDatasetClose() {
        setDatalistIsShown(false);
        setCountryQuery("");
        countryQueryRef.current = "";
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
            <div ref={divWrapperRef} className="relative flex items-center" onBlur={handleDatasetClose}>
                <button
                    ref={buttonRef}
                    onKeyDown={handleKeyDown}
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-controls={listId}
                    aria-expanded={datalistIsShown}
                    aria-activedescendant={
                        datalistIsShown ? `phone-code-option-${activeIndex}` : undefined
                    }
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
                        id={listId}
                        role="listbox"
                        style={{width: divWrapperWidth}}
                        className="absolute top-9 z-50 max-h-44 overflow-y-auto rounded-md bg-white py-2 text-sm text-black-primary shadow-md shadow-gray-400"
                        aria-labelledby="dropdown-phone-button"
                    >
                        {Object.keys(suggestedCountriesWithCodes).length > 0 ? (
                            Object.keys(suggestedCountriesWithCodes).map((c, i) => {
                                const phoneCode =
                                    suggestedCountriesWithCodes[c].toString();
                                return (
                                    <li ref={(el) => {
                                        if (el === null) return;
                                        optionRefs.current[i] = el;
                                    }} key={c} id={`phone-code-option-${i}`} role="option"
                                        aria-selected={activeIndex === i}>
                                        <button
                                            type="button"
                                            className={clsx(
                                                "px-4 py-2 cursor-pointer w-full text-left",
                                                activeIndex === i && "bg-blue-primary text-white"
                                            )}
                                            //className="inline-flex w-full px-4 py-2 text-sm  hover:bg-blue-primary hover:text-white"
                                            onMouseEnter={() => {
                                                setActiveIndex(i);
                                            }}
                                            onMouseDown={() => {
                                                onCountryPhoneCodeClick(phoneCode);
                                            }}
                                        >
                      <span className="inline-flex items-center">
                        {c} (+{phoneCode})
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
