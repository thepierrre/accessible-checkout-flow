import { clsx } from "clsx";
import { type ChangeEvent, useEffect, useId, useRef, useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { CombinedAddressFormData } from "@/app/schemas/addressFormSchema";
import Input from "@/app/components/shipping-and-billing/Input";
import useElementWidth from "@/app/hooks/ui/useElementWidth";
import useListboxNavigation from "@/app/hooks/navigation/useListboxNavigation";
import type { AddressType } from "@/app/types/address";

interface Props {
  countries: string[];
  addressType: AddressType;
  country: string;
  onCountryInputChange: (
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onCountryClick: (country: string, addressType: AddressType) => void;
  setValue: UseFormSetValue<CombinedAddressFormData>;
}

export default function CountriesListbox({
  countries,
  addressType,
  onCountryInputChange,
  onCountryClick,
  setValue,
}: Props) {
  const countriesListId = useId();
  const datalistRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [listboxIsShown, setListboxIsShown] = useState(false);
  const [listboxStyle, setListboxStyle] = useState<{
    top: number;
    width: number;
  }>({ top: 0, width: 0 });
  const options = countries;
  const { activeIndex, setActiveIndex, handleKeyDown } = useListboxNavigation({
    options: countries,
    onSelect: (country: string) => {
      onCountryClick(country, addressType);
      setListboxIsShown(false);
      inputRef.current?.focus();
    },
    onTab: () => {
      onCountryClick(options[activeIndex], addressType);
      setListboxIsShown(false);
    },
    onCancel: () => {
      setValue(`${addressType}.country`, "", { shouldValidate: true });
      setActiveIndex(-1);
      setListboxIsShown(false);
      inputRef.current?.focus();
    },
    isOpen: listboxIsShown,
    onOpen: () => {
      setListboxIsShown(true);
    },
    trigger: "input",
  });
  const inputWidth = useElementWidth(inputRef);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setListboxStyle({ top: rect.height, width: rect.width });
    }
  }, [listboxIsShown, inputWidth]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
    <div
      ref={divRef}
      className="relative flex flex-col gap-2"
      //TODO: Improve onBlur
      onBlur={() => {
        setListboxIsShown(false);
      }}
    >
      <Input
        ref={inputRef}
        required={true}
        name="country"
        labelText="Country/Territory"
        placeholder="Germany"
        addressType={addressType}
        autoComplete="country-name"
        type="text"
        onChange={(addressType, e) => {
          onCountryInputChange(addressType, e);
          const value = e.target.value.trim();

          if (value.length > 0) {
            setListboxIsShown(true);
          } else {
            setListboxIsShown(false);
          }
        }}
        onClick={() => setListboxIsShown(true)}
        onKeyDown={handleKeyDown}
        role="combobox"
        ariaControls={countriesListId}
        ariaActivedescendant={
          listboxIsShown ? `country-option-${activeIndex}` : undefined
        }
      />
      <ul
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <False positive: using a hook for navigation>
        role="listbox"
        ref={datalistRef}
        id={countriesListId}
        style={{ width: listboxStyle.width }}
        className={clsx(
          "absolute top-full left-0 z-50 max-h-64 overflow-y-auto rounded-md bg-white py-2 shadow-gray-400 shadow-md transition-opacity duration-150",
          listboxIsShown
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0",
        )}
      >
        {countries.length > 0 ? (
          countries.map((c, i) => (
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
                setListboxIsShown(false);
              }}
              key={c}
              id={`country-option-${i}`}
              // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <False positive: using a hook for navigation>
              role="option"
              aria-selected={activeIndex === i}
              className={clsx(
                "cursor-pointer p-2 text-md sm:text-sm",
                activeIndex === i && "bg-blue-primary text-white",
              )}
            >
              {c}
            </li>
          ))
        ) : (
          <li
            tabIndex={-1}
            className="px-4 py-2 text-gray-600 text-md sm:text-sm"
            // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
            role="option"
            aria-disabled="true"
          >
            No matching countries
          </li>
        )}
      </ul>
    </div>
  );
}
