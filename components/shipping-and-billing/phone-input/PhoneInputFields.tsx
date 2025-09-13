import { clsx } from "clsx";
import type { AddressType } from "@/types/address";
import { useFormContext } from "react-hook-form";
import type { CombinedAddressFormData } from "@/schemas/addressFormSchema";

interface Props {
  addressType: AddressType;
  id: string;
  error?: string;
}

export default function PhoneInputFields({ addressType, id, error }: Props) {
  const { register } = useFormContext<CombinedAddressFormData>();

  return (
    <>
      <input
        type="tel"
        inputMode="tel"
        id={id}
        autoComplete="tel"
        className={clsx(
          "relative h-12 grow rounded-md border border-gray-300 p-2 text-gray-900 text-md focus:outline-none focus:ring-1 sm:h-10 sm:text-sm",
          error
            ? "border-red-primary focus:ring-red-primary"
            : "border-gray-300 focus:border-blue-primary focus:ring-blue-primary",
        )}
        placeholder="123456789"
        {...register(`${addressType}.phone.phoneNumber`)}
      />
    </>
  );
}
