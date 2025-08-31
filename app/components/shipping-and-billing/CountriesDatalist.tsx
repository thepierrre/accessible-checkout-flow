import {
    AddressType,
    CombinedAddressFormData,
    CountriesWithCodes,
} from "@/app/checkout/models";
import {ChangeEvent, useRef, useState, KeyboardEvent, useEffect, useLayoutEffect} from "react";
import {UseFormRegister, UseFormSetValue} from "react-hook-form";
import {FieldNameType} from "@/app/components/shipping-and-billing/AddressForm";
import Input from "@/app/components/shipping-and-billing/Input";
import {clsx} from "clsx";

interface Props {
    suggestedCountries: CountriesWithCodes;
    addressType: AddressType;
    country: string;
    onCountryInputChange: (
        addressType: AddressType,
        event: ChangeEvent<HTMLInputElement>,
    ) => void;
    onCountryClick: (country: string, addressType: AddressType) => void;
    register: UseFormRegister<CombinedAddressFormData>;
    getErrorMessage: (fieldName: FieldNameType) => string | null;
    setValue: UseFormSetValue<CombinedAddressFormData>;
}

export default function CountriesDatalist({
                                              suggestedCountries,
                                              addressType,
                                              onCountryInputChange,
                                              onCountryClick,
                                              register,
                                              getErrorMessage,
                                              setValue,
                                          }: Props) {
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const datalistRef = useRef<HTMLUListElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);
    const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [datalistIsShown, setDatalistIsShown] = useState(false);
    const [datalistWidth, setDatalistWidth] = useState(0);

    useLayoutEffect(() => {
        if (!inputRef.current) return;

        function updateWidth() {
            if (inputRef.current) {
                setDatalistWidth(inputRef.current.clientWidth);
            }
        }

        updateWidth();

        const observer = new ResizeObserver(updateWidth);
        observer.observe(inputRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!datalistIsShown) return;
        const el = optionRefs.current[activeIndex];
        if (!el) return;
        el.scrollIntoView({block: "nearest"});

    }, [datalistIsShown, activeIndex]);


    function handleKeyDown(e: KeyboardEvent) {
        const options = Object.keys(suggestedCountries);
        if (options.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                if (!datalistIsShown) {
                    setDatalistIsShown(true);
                } else {
                    setActiveIndex((prev) => (prev + 1) % options.length);
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
                break;
            case "Home":
                e.preventDefault();
                setActiveIndex(0);
                break;
            case "End":
                e.preventDefault();
                setActiveIndex(options.length - 1);
                break;
            case "Enter":
                e.preventDefault();
                const selectedEnter = options[activeIndex];
                if (selectedEnter) {
                    onCountryClick(options[activeIndex], addressType);
                }
                setDatalistIsShown(false);
                inputRef.current?.focus();
                break;
            case "Escape":
                e.preventDefault();
                setValue(`${addressType}.country`, "", {shouldValidate: true});
                setDatalistIsShown(false);
                inputRef.current?.focus();
                break;
            case "Tab":
                if (options[activeIndex]) {
                    onCountryClick(options[activeIndex], addressType);
                }
                setDatalistIsShown(false);
                break;
        }
    }


    return (
        <div
            ref={divRef}
            className="relative flex flex-col gap-2"
            onBlur={() => {
                setDatalistIsShown(false);
            }}
        >
            <Input
                ref={inputRef}
                required={true}
                name="country"
                labelText="Country/Territory"
                placeholder="Germany"
                addressType={addressType}
                register={register}
                autoComplete="none"
                type="text"
                getErrorMessage={getErrorMessage}
                onChange={(addressType, e) => {
                    onCountryInputChange(addressType, e);
                    setDatalistIsShown(true);
                }}
                onClick={() => setDatalistIsShown(true)}
                onKeyDown={handleKeyDown}
                role="combobox"
                ariaControls="countries-list"
                ariaExpanded={datalistIsShown}
                ariaActivedescendant={
                    datalistIsShown ? `country-option-${activeIndex}` : undefined
                }
            />
            {datalistIsShown && (
                <ul
                    ref={datalistRef}
                    id="countries-list"
                    style={{width: datalistWidth}}
                    className="absolute top-16 z-50 flex max-h-44 flex-col overflow-y-auto rounded-md bg-white py-2 text-sm shadow-md shadow-gray-400"
                >
                    {Object.keys(suggestedCountries).length > 0 ? (
                        Object.keys(suggestedCountries).map((c, i) => (
                            <li
                                ref={(el) => {
                                    if (el === null) return;
                                    optionRefs.current[i] = el
                                }}
                                onMouseEnter={() => {
                                    setActiveIndex(i);
                                }}
                                onMouseDown={() => {
                                    onCountryClick(c, addressType);
                                    setDatalistIsShown(false);
                                }}
                                key={c}
                                id={`country-option-${i}`}
                                role="option"
                                aria-selected={activeIndex === i}
                                className={clsx(
                                    "px-4 py-2 cursor-pointer",
                                    activeIndex === i && "bg-blue-primary text-white"
                                )}

                            >
                                {c}
                            </li>
                        ))
                    ) : (
                        <p className="px-4 py-2">No matching countries</p>
                    )}
                </ul>
            )}
        </div>
    );
}
