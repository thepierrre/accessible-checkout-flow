import { clsx } from "clsx";
import { type ChangeEvent, type Ref, useId } from "react";
import { useFormContext, UseFormRegister } from "react-hook-form";
import type {
  AddressType,
  CombinedAddressFormData,
} from "@/app/schemas/addressFormSchema";
import type { FieldNameType } from "@/app/components/shipping-and-billing/AddressForm";

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
  ariaExpanded?: boolean;
  ariaActivedescendant?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
  ariaExpanded,
  ariaActivedescendant,
  onKeyDown,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CombinedAddressFormData>();
  const errorMessage = errors[addressType]?.[name]?.message;

  const id = useId();

  const { ref: registerRef, ...rest } = register(`${addressType}.${name}`);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={clsx(
          "font-medium",
          labelText !== "State/Province (optional)" && "after:content-['*']",
        )}
      >
        {labelText}
      </label>

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
        //TODO: aria-expanded
        // aria-expanded={ariaExpanded}
        aria-activedescendant={ariaActivedescendant}
        id={id}
        placeholder={placeholder}
        onChange={(event) => onChange?.(addressType, event)}
        onClick={onClick}
        autoComplete={autoComplete}
        onKeyDown={onKeyDown}
        type={type}
        className={clsx(
          "h-10 w-full rounded-md border px-2 text-base focus:outline-none focus:ring-1",
          errorMessage
            ? "border-red-primary focus:ring-red-primary"
            : "border-gray-300 focus:border-blue-primary focus:ring-blue-primary",
        )}
      />

      <p
        id={`${id}-error-message`}
        className={clsx(
          "overflow-hidden text-red-primary text-sm transition-[max-height] duration-700",
          errorMessage ? "max-h-8" : "max-h-0",
        )}
      >
        {errorMessage || ""}
      </p>
    </div>
  );
}
