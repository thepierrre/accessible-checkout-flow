import {UseFormRegister} from "react-hook-form";
import {AddressType, CombinedAddressFormData} from "@/app/checkout/models";
import {FieldNameType} from "@/app/components/shipping-and-billing/AddressForm";
import {ChangeEvent, Ref, useId} from "react";
import {clsx} from "clsx";

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
                                  register,
                                  autoComplete,
                                  type,
                                  getErrorMessage,
                                  onChange,
                                  onClick,
                                  required = false,
                                  ref,
                                  role,
                                  ariaControls,
                                  ariaExpanded,
                                  ariaActivedescendant,
                                  onKeyDown
                              }: Props) {
    const id = useId();
    const errorMessage = getErrorMessage(name);

    const {ref: registerRef, ...rest} = register(`${addressType}.${name}`);

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
                aria-expanded={ariaExpanded}
                aria-activedescendant={ariaActivedescendant}
                id={id}
                placeholder={placeholder}

                onChange={(event) => onChange && onChange(addressType, event)}
                onClick={onClick}
                autoComplete={autoComplete}
                onKeyDown={onKeyDown}
                type={type}
                className={clsx(
                    "h-8 w-full rounded-md border p-2 text-sm focus:outline-none focus:outline-1 focus:outline-offset-0",
                    errorMessage
                        ? "border-red-primary focus:outline-red-primary"
                        : "border-black-primary focus:outline-blue-semidark",
                )}
            />

            <p id={`${id}-error-message`}
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

// {/*{...register(`${addressType}.${name}`)}*/
// }