import { clsx } from "clsx";
import { type ChangeEvent, useId, useRef, useState } from "react";
import { useFormContext, type UseFormSetValue } from "react-hook-form";
import type { CombinedAddressFormData } from "@/schemas/addressFormSchema";
import Input from "@/components/shipping-and-billing/Input";
import useElementWidth from "@/hooks/ui/useElementWidth";
import usePopupNavigation from "@/hooks/navigation/usePopupNavigation";
import type { AddressType } from "@/types/address";
import { usePopupStyle } from "@/hooks/ui/usePopupStyle";
import InputErrorMessage from "@/components/shipping-and-billing/InputErrorMessage";
import { useActiveScroll } from "@/hooks/navigation/useActiveScroll";

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

export default function CountryPopup({
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
  const [isOpen, setisOpen] = useState(false);
  const {
    formState: { errors },
  } = useFormContext<CombinedAddressFormData>();

  const errorMessage = errors[addressType]?.country?.message;
  const options = countries;
  const { activeIndex, setActiveIndex, handleKeyDown } = usePopupNavigation({
    options: countries,
    onSelect: (country: string) => {
      onCountryClick(country, addressType);
      setisOpen(false);
      inputRef.current?.focus();
    },
    onTab: () => {
      onCountryClick(options[activeIndex], addressType);
      setisOpen(false);
    },
    onCancel: () => {
      setValue(`${addressType}.country`, "", { shouldValidate: true });
      setActiveIndex(-1);
      setisOpen(false);
      inputRef.current?.focus();
    },
    isOpen: isOpen,
    onOpen: () => {
      setisOpen(true);
    },
    trigger: "input",
  });
  const inputWidth = useElementWidth(inputRef);
  const popupStyle = usePopupStyle(inputRef, inputWidth);
  useActiveScroll(optionRefs, activeIndex, isOpen);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
    <div
      ref={divRef}
      className="flex flex-col gap-2"
      //TODO: Improve onBlur
      onBlur={() => {
        setisOpen(false);
      }}
    >
      <div className="relative">
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
              setisOpen(true);
            } else {
              setisOpen(false);
            }
          }}
          onClick={() => setisOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          ariaControls={countriesListId}
          ariaActivedescendant={
            isOpen ? `country-option-${activeIndex}` : undefined
          }
          hasPopup={true}
        />
        <ul
          // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <False positive: using a hook for navigation>
          role="listbox"
          ref={datalistRef}
          id={countriesListId}
          style={{ width: popupStyle.width }}
          className={clsx(
            "absolute top-full left-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-md bg-white py-2 shadow-gray-400 shadow-md transition-opacity duration-150",
            isOpen
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
                  setisOpen(false);
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
      <InputErrorMessage message={errorMessage} />
    </div>
  );
}
