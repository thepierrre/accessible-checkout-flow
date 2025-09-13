import { clsx } from "clsx";
import {
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
  useRef,
} from "react";
import { useFormContext } from "react-hook-form";
import { useActiveScroll } from "@/hooks/navigation/useActiveScroll";
import { useDialCodeQueryOptions } from "@/hooks/shipping-and-billing/useDialCodeQueryOptions";
import { useQueryBuffer } from "@/hooks/shipping-and-billing/useQueryBuffer";
import type { CombinedAddressFormData } from "@/schemas/addressFormSchema";
import type { AddressType } from "@/types/address";
import type { CountryOption } from "./PhoneInput";

interface NavigatonProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onCombinedKeyDown: (e: KeyboardEvent) => void;
}

interface PopupProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  popupId: string;
  popupStyle: { top: number; width: number };
}

interface Props {
  options: CountryOption[];
  activeQuery: string;
  navigation: NavigatonProps;
  popup: PopupProps;
  addressType: AddressType;
  error?: string;
}

export default function CountryCodesPopup({
  options,
  activeQuery,
  navigation,
  popup,
  addressType,
  error,
}: Props) {
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const filteredOptions = useDialCodeQueryOptions(options, activeQuery);
  const { register, setValue, getValues, trigger } =
    useFormContext<CombinedAddressFormData>();

  const { reset } = useQueryBuffer();
  const { isOpen, setIsOpen, popupId, popupStyle } = popup;
  const { activeIndex, setActiveIndex, onCombinedKeyDown } = navigation;
  useActiveScroll(optionRefs, activeIndex, isOpen);

  return (
    <div className="relative">
      <input
        type="tel"
        role="combobox"
        inputMode="tel"
        autoComplete="tel-country-code"
        placeholder="+0"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={popupId}
        {...register(`${addressType}.phone.phoneCode`)}
        onFocus={() => setIsOpen(true)}
        onChange={() => {
          setIsOpen(true);
        }}
        onKeyDown={onCombinedKeyDown}
        onBlur={() => {
          const num = getValues(`${addressType}.phone.phoneNumber`)?.trim();
          if (num) trigger(`${addressType}.phone.phoneNumber`);
        }}
        className={clsx(
          "h-12 w-16 rounded-md border bg-white px-2 text-sm focus:outline-none focus:ring-1 sm:h-10",
          error
            ? "border-red-primary focus:ring-red-primary"
            : "border-gray-300 focus:border-blue-primary focus:ring-blue-primary",
        )}
      />

      <ul
        id={popupId}
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
        role="listbox"
        style={{ width: popupStyle.width }}
        onKeyDown={onCombinedKeyDown}
        className={clsx(
          "absolute z-50 mt-1 max-h-48 w-48 overflow-y-auto rounded-md bg-white py-2 shadow-md",
          isOpen ? "block" : "hidden",
        )}
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map((c, i) => (
            <li
              tabIndex={-1}
              key={c.code}
              id={`phone-option-${i}`}
              ref={(el) => {
                if (el === null) return;
                optionRefs.current[i] = el;
              }}
              // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
              role="option"
              aria-selected={activeIndex === i}
              className={clsx(
                "cursor-pointer p-2 text-md sm:text-sm",
                activeIndex === i && "bg-blue-primary text-white",
              )}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseDown={() => {
                setValue(`${addressType}.phone.phoneCode`, c.dialCode, {
                  shouldValidate: true,
                });
                reset();
                setIsOpen(false);
              }}
            >
              {c.dialCode} ({c.name})
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
            No matching country codes
          </li>
        )}
      </ul>
    </div>
  );
}
