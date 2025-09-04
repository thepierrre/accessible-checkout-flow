import { clsx } from "clsx";
import Image from "next/image";
import { useId } from "react";
import { useFormContext } from "react-hook-form";
import type { CombinedAddressFormData } from "@/app/schemas/addressFormSchema";
import Tooltip from "@/app/components/shared/Tooltip";
import questionIcon from "../../../public/icons/questionIcon.svg";
import type { AddressType } from "@/app/types/address";

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
        <label
          htmlFor={`${addressType}-phone`}
          className="font-medium text-md sm:text-sm"
        >
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
      {/*TODO examine / write explanation*/}
      <div className="relative flex items-center">
        <input
          type="tel"
          id={inputId}
          autoComplete="tel"
          className={clsx(
            "relative h-12 grow rounded-md border border-gray-300 p-2 text-gray-900 text-md focus:outline-none focus:ring-1 sm:h-10 sm:text-sm",
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
