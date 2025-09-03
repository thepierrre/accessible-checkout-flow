import { clsx } from "clsx";
import Image from "next/image";
import { useId } from "react";
import { useFormContext, UseFormRegister } from "react-hook-form";
import type {
  AddressType,
  CombinedAddressFormData,
} from "@/app/schemas/addressFormSchema";
import Tooltip from "@/app/components/shared/Tooltip";
import type { FieldNameType } from "@/app/components/shipping-and-billing/AddressForm";
import questionIcon from "../../../public/icons/questionIcon.svg";

interface Props {
  labelText: string;
  addressType: AddressType;
}

export default function PhoneInput({ labelText, addressType }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CombinedAddressFormData>();
  const errorMessage = errors[addressType]?.phone?.message;

  const tooltipId = useId();
  const inputId = useId();

  return (
    <section className="flex flex-col gap-0.5">
      <div className="relative flex gap-1">
        <label htmlFor={`${addressType}-phone`} className="font-medium">
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
              className="w-5"
              tabIndex={0}
              {...triggerProps}
            />
          )}
        </Tooltip>
      </div>
      {/*TODO examine / write explanation*/}
      <div className="relative flex items-center">
        <label
          htmlFor={inputId}
          className="sr-only mb-2 font-semibold text-sm antialiased"
        >
          Phone number:
        </label>
        <input
          type="tel"
          id={inputId}
          autoComplete="tel"
          className={clsx(
            "relative h-10 grow rounded-md border border-gray-300 p-2 text-gray-900 text-sm focus:outline-none focus:ring-1",
            errorMessage
              ? "border-red-primary focus:ring-red-primary"
              : "border-gray-300 focus:border-blue-primary focus:ring-blue-primary",
          )}
          placeholder="+49123456789"
          {...register(`${addressType}.phone`)}
        />
      </div>
      <p
        className={clsx(
          "overflow-hidden text-red-primary text-sm transition-[max-height] duration-700",
          errorMessage ? "max-h-8" : "max-h-0",
        )}
      >
        {errorMessage || "\u00A0"}
      </p>
    </section>
  );
}
