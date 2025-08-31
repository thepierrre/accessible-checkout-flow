import {
    AddressType,
    CombinedAddressFormData,
    CountriesWithCodes,
} from "@/app/checkout/models";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {UseFormRegister} from "react-hook-form";
import {FieldNameType} from "@/app/components/shipping-and-billing/AddressForm";
import Input from "@/app/components/shipping-and-billing/Input";
import useKeyboardNavigation from "@/app/hooks/useKeyboardNavigation";
import {clsx} from "clsx";
import ListElement from "@/app/components/shipping-and-billing/ListElement";
import ChevronDownIcon from "@/app/components/shared/ChevronDownIcon";

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
}

export default function CountriesDatalist({
                                              suggestedCountries,
                                              addressType,
                                              onCountryInputChange,
                                              onCountryClick,
                                              register,
                                              getErrorMessage,
                                          }: Props) {
    const [activeElement, setActiveElement] = useKeyboardNavigation(
        Object.keys(suggestedCountries).length,
    );
    const divRef = useRef<HTMLDivElement | null>(null);
    const [datalistIsShown, setDatalistIsShown] = useState(false);

    useEffect(() => {
        const div = divRef.current;
        if (!div) return;

        const handleFocusIn = (e: FocusEvent) => {
            if (
                e.target instanceof HTMLInputElement &&
                e.target.name === `${addressType}.country`
            ) {
                setDatalistIsShown(true);
                setActiveElement(0);
            }
        };

        const handleFocusOut = (e: FocusEvent) => {
            if (
                e.target instanceof HTMLInputElement &&
                e.target.name === `${addressType}.country`
            ) {
                setDatalistIsShown(false);
                setActiveElement(0);
            }
        };

        div.addEventListener("focusin", handleFocusIn);
        div.addEventListener("focusout", handleFocusOut);

        return () => {
            div.removeEventListener("focusin", handleFocusIn);
            div.removeEventListener("focusout", handleFocusOut);
        };
    });

    function handleInputClick() {
        setDatalistIsShown(true);
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setDatalistIsShown(false);
            }
        };

        if (datalistIsShown) {
            document.addEventListener("keydown", handleKeyDown);
        }
    }, [datalistIsShown]);

    return (
        <div
            ref={divRef}
            className="relative flex flex-col gap-2"
            onBlur={() => {
                setDatalistIsShown(false);
                console.log("section blur");
            }}
        >
            <Input
                aria-required={true}
                name="country"
                labelText="Country/Territory"
                placeholder="Germany"
                addressType={addressType}
                register={register}
                autoComplete="country"
                type="text"
                getErrorMessage={getErrorMessage}
                onChange={(addressType, e) => {
                    onCountryInputChange(addressType, e);
                    setDatalistIsShown(true);
                }}
                onClick={handleInputClick}
                icon={<ChevronDownIcon/>}
            />

            {datalistIsShown && (
                <ul
                    id="countries-list"
                    className="absolute top-16 z-50 flex max-h-44 w-112 flex-col overflow-y-auto rounded-md bg-white py-2 text-sm shadow-md shadow-gray-400"
                >
                    {Object.keys(suggestedCountries).length > 0 ? (
                        Object.keys(suggestedCountries).map((country, index) => (
                            <ListElement
                                activeIndex={activeElement}
                                country={country}
                                key={country}
                                index={index}
                                datalistIsShown={datalistIsShown}
                                setDatalistIsShown={setDatalistIsShown}
                                addressType={addressType}
                                onCountryClick={onCountryClick}
                            />
                        ))
                    ) : (
                        <p className="px-4 py-2">No matching countries</p>
                    )}
                </ul>
            )}
        </div>
    );
}
