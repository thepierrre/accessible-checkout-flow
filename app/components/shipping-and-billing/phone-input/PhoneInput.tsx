"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import type { CombinedAddressFormData } from "@/app/schemas/addressFormSchema";
import Tooltip from "@/app/components/shared/Tooltip";
import questionIcon from "../../../../public/icons/questionIcon.svg";
import type { AddressType } from "@/app/types/address";
import { countries } from "countries-list";
import usePopupNavigation from "@/app/hooks/navigation/usePopupNavigation";
import useElementWidth from "@/app/hooks/ui/useElementWidth";
import { useClickOutside } from "@/app/hooks/navigation/useClickOutside";
import { useQueryBuffer } from "@/app/hooks/shipping-and-billing/useQueryBuffer";
import InputErrorMessage from "@/app/components/shipping-and-billing/InputErrorMessage";
import CountryCodesPopup from "@/app/components/shipping-and-billing/phone-input/CountryCodesPopup";
import PhoneInputFields from "@/app/components/shipping-and-billing/phone-input/PhoneInputFields";
import useGeneratedIds from "@/app/hooks/useGeneratedIds";
import { usePopupStyle } from "@/app/hooks/ui/usePopupStyle";

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
    trigger: "button",
  });

  const { tooltipId, inputId, popupId } = useGeneratedIds(
    "tooltipId",
    "inputId",
    "popupId",
  );

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
        <Tooltip
          label="Used only if there's an issue."
          position="right"
          id={tooltipId}
        >
          {(triggerProps) => (
            <Image
              src={questionIcon}
              alt=""
              tabIndex={0}
              {...triggerProps}
              className="w-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-primary"
            />
          )}
        </Tooltip>
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
        <PhoneInputFields
          addressType={addressType}
          id={inputId}
          error={!phoneCodeError ? phoneNumberError : undefined}
        />
      </div>
      <InputErrorMessage message={phoneCodeError || phoneNumberError} />
    </section>
  );
}
