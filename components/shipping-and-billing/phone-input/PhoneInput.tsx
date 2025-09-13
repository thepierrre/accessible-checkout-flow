"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import type { CombinedAddressFormData } from "@/schemas/addressFormSchema";
import questionIcon from "../../../public/icons/questionIcon.svg";
import type { AddressType } from "@/types/address";
import { countries } from "countries-list";
import usePopupNavigation from "@/hooks/navigation/usePopupNavigation";
import useElementWidth from "@/hooks/ui/useElementWidth";
import { useClickOutside } from "@/hooks/navigation/useClickOutside";
import { useQueryBuffer } from "@/hooks/shipping-and-billing/useQueryBuffer";
import InputErrorMessage from "@/components/shipping-and-billing/InputErrorMessage";
import CountryCodesPopup from "@/components/shipping-and-billing/phone-input/CountryCodesPopup";
import PhoneNumberInputField from "@/components/shipping-and-billing/phone-input/PhoneNumberInputField";
import useGeneratedIds from "@/hooks/useGeneratedIds";
import { usePopupStyle } from "@/hooks/ui/usePopupStyle";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipProvider } from "@/shadcn-components/ui/Tooltip";

interface Props {
  labelText: string;
  addressType: AddressType;
}

export interface CountryOption {
  code: string;
  name: string;
  dialCode: string;
}

export default function PhoneInput({ labelText, addressType }: Props) {
  const {
    formState: { errors },
    setValue,
    trigger,
  } = useFormContext<CombinedAddressFormData>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<CountryOption | null>(null);

  const { activeQuery, handleKey, reset } = useQueryBuffer();

  const options: CountryOption[] = Object.entries(countries).map(
    ([code, data]) => ({
      code,
      name: data.name,
      dialCode: `+${data.phone}`,
    }),
  );
  const containerWidth = useElementWidth(containerRef);
  const popupStyle = usePopupStyle(containerRef, containerWidth);

  useClickOutside(containerRef, () => {
    reset();
    setIsOpen(false);
  });
  const { activeIndex, setActiveIndex, handleKeyDown } = usePopupNavigation({
    options: options.map((o) => o.dialCode),
    onSelect: (dialCode: string) => {
      const match = options.find((o) => o.dialCode === dialCode);
      if (match) {
        setSelected(match);
        setValue(`${addressType}.phone.phoneCode`, match.dialCode, {
          shouldValidate: true,
        });
      }
      setIsOpen(false);
    },
    onCancel: () => {
      setSelected(null);
      setValue(`${addressType}.phone.phoneCode`, "", {
        shouldValidate: true,
      });
      trigger(`${addressType}.phone.phoneNumber`);
      reset();
      setIsOpen(false);
    },
    onTab: () => {
      const dialCode = options[activeIndex]?.dialCode;
      if (dialCode) {
        setSelected(options[activeIndex]);
        setValue(`${addressType}.phone.phoneCode`, dialCode, {
          shouldValidate: true,
        });
      }
      setIsOpen(false);
    },
    isOpen,
    onOpen: () => setIsOpen(true),
  });

  const { inputId, popupId } = useGeneratedIds("inputId", "popupId");

  const phoneErrors = errors[addressType]?.phone;
  const [phoneCodeError, phoneNumberError] = [
    phoneErrors?.phoneCode?.message,
    phoneErrors?.phoneNumber?.message,
  ];

  const handleCombinedKeyDown = (e: KeyboardEvent) => {
    handleKeyDown(e);
    handleKey(e.key);
  };

  return (
    <section className="flex flex-col gap-0.5">
      <div ref={containerRef} className="relative flex gap-1">
        <label htmlFor={inputId} className="font-medium text-md sm:text-sm">
          {labelText}
        </label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="hidden sm:block">
              <Image
                tabIndex={0}
                src={questionIcon}
                alt=""
                className="pointer-events-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-primary"
              />
            </TooltipTrigger>
            <TooltipContent className="fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-tooltip-content-transform-origin] animate-in overflow-hidden rounded-md bg-blue-primary px-3 py-1.5 text-white text-xs data-[state=closed]:animate-out">
              Used only if there's an issue.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex gap-1">
        <CountryCodesPopup
          selection={{ selected, setSelected }}
          navigation={{
            activeIndex,
            setActiveIndex,
            onCombinedKeyDown: handleCombinedKeyDown,
          }}
          popup={{ isOpen, setIsOpen, popupId, popupStyle }}
          options={options}
          activeQuery={activeQuery}
          addressType={addressType}
          error={phoneCodeError}
        />
        <PhoneNumberInputField
          addressType={addressType}
          id={inputId}
          error={!phoneCodeError ? phoneNumberError : undefined}
        />
      </div>
      <InputErrorMessage message={phoneCodeError || phoneNumberError} />
    </section>
  );
}
