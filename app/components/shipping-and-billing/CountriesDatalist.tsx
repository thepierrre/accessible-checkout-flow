import { clsx } from "clsx";
import { type ChangeEvent, useEffect, useId, useRef, useState } from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import type {
  AddressType,
  CombinedAddressFormData,
  CountriesWithCodes,
} from "@/app/checkout/models";
import type { FieldNameType } from "@/app/components/shipping-and-billing/AddressForm";
import Input from "@/app/components/shipping-and-billing/Input";
import useElementWidth from "@/app/hooks/useElementWidth";
import useListboxNavigation from "@/app/hooks/useListboxNavigation";

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
  const countriesListId = useId();
  const datalistRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [datalistIsShown, setDatalistIsShown] = useState(false);
  const options = Object.keys(suggestedCountries);
  const { activeIndex, setActiveIndex, handleKeyDown } = useListboxNavigation({
    options: Object.keys(suggestedCountries),
    onSelect: () => {
      onCountryClick(options[activeIndex], addressType);
      setDatalistIsShown(false);
      inputRef.current?.focus();
    },
    onTab: () => {
      onCountryClick(options[activeIndex], addressType);
      setDatalistIsShown(false);
    },
    onCancel: () => {
      setValue(`${addressType}.country`, "", { shouldValidate: true });
      setActiveIndex(-1);
      setDatalistIsShown(false);
      inputRef.current?.focus();
    },
    isOpen: datalistIsShown,
    onOpen: () => {
      setDatalistIsShown(true);
    },
    trigger: "input",
  });
  const inputWidth = useElementWidth(inputRef);

  useEffect(() => {
    if (!datalistIsShown) return;
    const el = optionRefs.current[activeIndex];
    if (!el) return;
    el.scrollIntoView({ block: "nearest" });
  }, [datalistIsShown, activeIndex]);

  return (
    //TODO examine
    // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
    <div
      ref={divRef}
      className="relative flex flex-col gap-2"
      //TODO: Improve onBlur
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
        ariaControls={countriesListId}
        ariaExpanded={datalistIsShown}
        ariaActivedescendant={
          datalistIsShown ? `country-option-${activeIndex}` : undefined
        }
      />
      {datalistIsShown && (
        <ul
          // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <False positive: using a hook for navigation>
          role="listbox"
          ref={datalistRef}
          id={countriesListId}
          style={{ width: inputWidth }}
          className="absolute top-20 z-50 flex max-h-44 flex-col overflow-y-auto rounded-md bg-white py-2 text-sm shadow-gray-400 shadow-md"
        >
          {Object.keys(suggestedCountries).length > 0 ? (
            Object.keys(suggestedCountries).map((c, i) => (
              <li
                tabIndex={-1}
                ref={(el) => {
                  if (el === null) return;
                  optionRefs.current[i] = el;
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
                // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <False positive: using a hook for navigation>
                role="option"
                aria-selected={activeIndex === i}
                className={clsx(
                  "cursor-pointer px-4 py-2",
                  activeIndex === i && "bg-blue-primary text-white",
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
