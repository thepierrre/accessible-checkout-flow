"use client";

import Image from "next/image";
import Link from "next/link";
import Heading from "@/app/components/shared/Heading";
import { useAddress } from "@/app/context/AddressContext";
import { isBillingSameAsShipping } from "@/app/lib/addressDataUtils";
import editIcon from "@/public/icons/editIcon.svg";

interface Props {
  type: "shipping" | "billing";
}

export default function AddressSection({ type }: Props) {
  const combinedAddress = useAddress();

  const addressType = combinedAddress[type];

  console.log("addressType", addressType);

  if (!addressType) return;

  const { email, name, address, zip, region, country, phoneCode, phoneNumber } =
    addressType;

  const billingSameAsShipping = isBillingSameAsShipping();

  return (
    <section className="mt-2 flex flex-col">
      <div className="mb-2 flex border-gray-primary border-b pb-2">
        <div className="mb-2 flex grow gap-2">
          <Heading label={type} as="h2" />
        </div>
        <Link
          href={`/checkout/shipping-and-billing?edit=${type === "shipping" ? "shipping" : "billing"}`}
          className="inline-flex items-center gap-1 rounded-full bg-blue-extralight px-3 font-medium text-blue-primary text-sm transition-colors duration-200 hover:bg-blue-light"
        >
          <Image src={editIcon} alt="" className="h-4 w-4" />
          Change
        </Link>
      </div>
      <div className="flex flex-col gap-1 px-4 text-sm">
        {type === "billing" && billingSameAsShipping ? (
          <p className="text-sm">(Same as delivery)</p>
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
                <span>(+{phoneCode})</span>
                <span>{phoneNumber}</span>
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
