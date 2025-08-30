import { UseFormRegister } from "react-hook-form";
import { AddressType, CombinedAddressFormData } from "@/app/checkout/models";
import { FieldNameType } from "@/app/components/shipping-and-billing/AddressForm";
import { ChangeEvent, Ref } from "react";
import { clsx } from "clsx";

interface Props {
  name: FieldNameType;
  labelText: string;
  placeholder?: string;
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
  ref?: Ref<HTMLDivElement>;
}

export default function Input({
  name,
  labelText,
  placeholder,
  addressType,
  register,
  autoComplete,
  type,
  getErrorMessage,
  onChange,
  onClick,
}: Props) {
  const errorMessage = getErrorMessage(name);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`${addressType}-${name}`}
        className={clsx(
          "font-medium",
          labelText !== "State/Province (optional)" && "after:content-['*']",
        )}
      >
        {labelText}
      </label>

      <input
        id={`${addressType}-${name}`}
        placeholder={placeholder}
        {...register(`${addressType}.${name}`)}
        onChange={(event) => onChange && onChange(addressType, event)}
        onClick={onClick && onClick}
        autoComplete={autoComplete}
        type={type}
        className={clsx(
          "h-8 w-full rounded-md border p-2 text-sm focus:outline-none focus:outline-1 focus:outline-offset-0",
          errorMessage
            ? "border-red-primary focus:outline-red-primary"
            : "border-black-primary focus:outline-blue-semidark",
        )}
      />

      <p
        className={clsx(
          "overflow-hidden text-sm text-red-primary transition-[max-height] duration-700",
          errorMessage ? "max-h-8" : "max-h-0",
        )}
      >
        {errorMessage || "\u00A0"}
      </p>
    </div>
  );
}
