"use client";

import Heading from "@/components/shared/Heading";
import { useAddress } from "@/context/AddressContext";
import { isBillingSameAsShipping } from "@/lib/addressDataUtils";
import editIcon from "@/public/icons/editIcon.svg";
import LinkButton from "@/components/shared/LinkButton";

interface Props {
  type: "shipping" | "billing";
}

export default function AddressSection({ type }: Props) {
  const combinedAddress = useAddress();
  const addressType = combinedAddress[type];

  if (!addressType) return;

  const { email, name, address, zip, region, country, phone } = addressType;
  const { phoneCode, phoneNumber } = phone ?? {};
  const billingSameAsShipping = isBillingSameAsShipping();

  return (
    <section className="mt-2 flex flex-col border-gray-300 border-b pb-4">
      <div className="mb-2 flex">
        <div className="mb-2 flex grow gap-2">
          <Heading label={type} as="h2" />
        </div>
        <LinkButton
          variant="soft"
          label="Change"
          href={`/checkout/shipping-and-billing?edit=${type === "shipping" ? "shipping" : "billing"}`}
          icon={{
            img: { src: editIcon, alt: "" },
            position: "right",
          }}
        />
      </div>
      <div className="flex flex-col gap-1 px-4 text-sm">
        {type === "billing" && billingSameAsShipping ? (
          <p>(Same as delivery)</p>
        ) : (
          <>
            <p>{email}</p>
            <p>{name}</p>
            <p>{address}</p>
            <p>{zip}</p>
            <p>{region}</p>
            <p>{country}</p>
            {phoneCode && phoneNumber && (
              <p className="flex gap-1">
                <span>({phoneCode})</span>
                <span>{phoneNumber}</span>
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
