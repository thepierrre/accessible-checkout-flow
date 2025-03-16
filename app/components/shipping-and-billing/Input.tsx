import { UseFormRegister } from "react-hook-form";
import { AddressType, CombinedAddressFormData } from "@/app/checkout/models";
import { FieldNameType } from "@/app/components/shipping-and-billing/AddressForm";
import { ChangeEvent, useState } from "react";
import { event } from "next/dist/build/output/log";
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
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const errorMessage = getErrorMessage(name);

  return (
    <section className="flex flex-col gap-1 w-full">
      <div
        className="flex gap-2 align-center"
        onPointerLeave={() => setIsMouseOver(false)}
      >
        <label
          htmlFor={`${addressType}-${name}`}
          className={clsx(
            "font-medium",
            labelText !== "State/Province (optional)" && "after:content-['*']",
          )}
        >
          {labelText}
        </label>
      </div>

      <input
        id={`${addressType}-${name}`}
        placeholder={placeholder}
        {...register(`${addressType}.${name}`)}
        onChange={(event) => onChange && onChange(addressType, event)}
        onClick={onClick && onClick}
        autoComplete={autoComplete}
        type={type}
        className={clsx(
          "border w-full h-8 p-2 rounded-md text-sm focus:outline-none focus:outline-1 focus:outline-offset-0",
          errorMessage
            ? "border-red-primary focus:outline-red-primary"
            : "border-black-primary focus:outline-blue-semidark ",
        )}
      />

      {errorMessage && (
        <p className="text-red-primary animate-in fade-in duration-700 text-sm ">
          {errorMessage}
        </p>
      )}
    </section>
  );
}
