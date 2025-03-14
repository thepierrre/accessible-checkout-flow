import { UseFormRegister } from "react-hook-form";
import { AddressType, CombinedAddressFormData } from "@/app/checkout/models";
import { FieldNameType } from "@/app/ui/shipping/AddressForm";
import { ChangeEvent, useState } from "react";
import { event } from "next/dist/build/output/log";

interface Props {
  name: FieldNameType;
  labelText: string;
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
    <section className="flex flex-col gap-1">
      <div
        className="flex gap-2 align-center"
        onPointerLeave={() => setIsMouseOver(false)}
      >
        <label
          htmlFor={`${addressType}-${name}`}
          className="font-semibold antialiased"
        >
          {labelText}
        </label>
      </div>

      <input
        id={`${addressType}-${name}`}
        {...register(`${addressType}.${name}`)}
        onChange={(event) => onChange && onChange(addressType, event)}
        onClick={onClick && onClick}
        autoComplete={autoComplete}
        type={type}
        className="border border-gray-700 w-112 h-8 p-2 rounded-md text-sm"
      />

      {errorMessage && (
        <p className="text-red-500 animate-in fade-in duration-700 text-sm ">
          {errorMessage}
        </p>
      )}
    </section>
  );
}
