import { clsx } from "clsx";
import { type ChangeEvent, type KeyboardEvent, type Ref, useId } from "react";
import { useFormContext } from "react-hook-form";
import type { CombinedAddressFormData } from "@/schemas/addressFormSchema";
import type { FieldNameType } from "@/components/shipping-and-billing/AddressForm";
import type { AddressType } from "@/types/address";
import InputErrorMessage from "@/components/shipping-and-billing/InputErrorMessage";

interface Props {
  name: FieldNameType;
  labelText: string;
  placeholder?: string;
  addressType: AddressType;
  autoComplete: string;
  type: "text" | "tel" | "email";
  onChange?: (
    addressType: AddressType,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onClick?: () => void;
  ref?: Ref<HTMLInputElement>;
  required?: boolean;
  role?: string;
  ariaControls?: string;
  ariaActivedescendant?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  hasPopup?: boolean;
}

export default function Input({
  name,
  labelText,
  placeholder,
  addressType,
  autoComplete,
  type,
  onChange,
  onClick,
  required = false,
  ref,
  role,
  ariaControls,
  ariaActivedescendant,
  onKeyDown,
  hasPopup = false,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CombinedAddressFormData>();
  const errorMessage = errors[addressType]?.[name]?.message;

  const id = useId();

  const { ref: registerRef, ...rest } = register(`${addressType}.${name}`);

  return (
    <div className="flex flex-col gap-1 sm:gap-2">
      <label
        htmlFor={id}
        className={clsx(
          "font-medium text-md sm:text-sm",
          labelText !== "State/Province (optional)" && "after:content-['*']",
        )}
      >
        {labelText}
      </label>

      <div className="flex flex-col gap-1">
        <input
          onInput={(e) => register(`${addressType}.${name}`).onChange(e)}
          {...rest}
          ref={(el) => {
            if (ref && "current" in ref) ref.current = el;
            registerRef(el);
          }}
          aria-required={required}
          aria-invalid={!!errorMessage}
          aria-errormessage={errorMessage ? `${id}-error-message` : undefined}
          role={role}
          aria-controls={ariaControls}
          aria-activedescendant={ariaActivedescendant}
          id={id}
          placeholder={placeholder}
          onChange={(event) => onChange?.(addressType, event)}
          onClick={onClick}
          autoComplete={autoComplete}
          onKeyDown={onKeyDown}
          type={type}
          className={clsx(
            "h-12 w-full rounded-lg border px-2 text-md focus:outline-none focus:ring-1 sm:h-10 sm:text-sm",
            errorMessage
              ? "border-red-primary focus:ring-red-primary"
              : "border-gray-300 focus:border-blue-primary focus:ring-blue-primary",
          )}
        />
        {!hasPopup && <InputErrorMessage message={errorMessage} />}
      </div>
    </div>
  );
}
