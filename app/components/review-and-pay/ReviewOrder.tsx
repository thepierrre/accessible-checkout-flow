"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { AddressData } from "@/app/checkout/models";
import PromoCodeForm from "@/app/components/review-and-pay/PromoCodeForm";
import Table from "@/app/components/review-and-pay/Table";
import {
  getAddressData,
  isBillingSameAsShipping,
} from "@/app/lib/addressDataUtils";
import collapseIcon from "../../../public/icons/collapseIcon.svg";
import editIcon from "../../../public/icons/editIcon.svg";
import expandIcon from "../../../public/icons/expandIcon.svg";

export default function ReviewOrder() {
  const tooltipId = useId();
  const [shipping, setShipping] = useState<AddressData | undefined>(undefined);
  const [billing, setBilling] = useState<AddressData | undefined>(undefined);
  const [discountApplied, setDiscountApplied] = useState<number | undefined>(
    undefined,
  );
  const [isAddingCode, setIsAddingCode] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<
    HTMLAnchorElement | HTMLDivElement | null
  >(null);

  const changeShippingLinkRef = useRef<HTMLAnchorElement | null>(null);
  const changeBillingLinkRef = useRef<HTMLAnchorElement | null>(null);
  const changeCartLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const { shipping, billing } = getAddressData();
    console.log("shipping", shipping);
    console.log("billing", billing);
    setShipping(shipping);
    setBilling(billing);
  }, []);

  if (!shipping) return;

  const {
    email: shippingEmail,
    name: shippingName,
    address: shippingAddress,
    zip: shippingZip,
    region: shippingRegion,
    country: shippingCountry,
    phone: { code: shippingPhoneCode, number: shippingPhoneNumber } = {},
  } = shipping;

  const {
    email: billingEmail,
    name: billingName,
    address: billingAddress,
    zip: billingZip,
    region: billingRegion,
    country: billingCountry,
    phone: { code: billingPhoneCode, number: billingPhoneNumber } = {},
  } = billing ?? {};

  function handleCollapseOrExpand() {
    setIsAddingCode(!isAddingCode);
  }

  function applyDiscount(discount: number) {
    setDiscountApplied(discount);
  }

  function handleCodeIconDisplay() {
    if (isAddingCode) {
      return collapseIcon;
    } else {
      return expandIcon;
    }
  }

  if (!shipping || !billing) {
    return;
  }

  return (
    // <PromoCodeContext.Provider value={}>
    <section className="w-full">
      <div className="mb-6">
        <span className="rounded-full bg-blue-extralight px-2 py-0.5 text-blue-primary text-sm tracking-wide">
          Step 2 of 3
        </span>
      </div>
      <div className="mx-auto flex flex-col">
        <h1 className="relative mb-6 inline-block font-bold text-3xl text-gray-900 uppercase tracking-wide">
          Review order
          <span className="absolute left-0 -bottom-2 h-1 w-[100%] bg-blue-primary"></span>
        </h1>
        <h2 className="mb-6 w-full text-gray-dark">
          Take a moment to ensure everything is correct.
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <section className="flex flex-col">
          <div className="flex">
            <div className="flex grow gap-2 mb-2">
              <h2 className="pl-3 text-xl font-semibold tracking-wide text-gray-800 border-l-4 border-blue-primary">
                Promo code
              </h2>
            </div>
            {/*TODO examine*/}
            {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
            <div
              onMouseEnter={() => setHoveredElement(changeCartLinkRef.current)}
              onMouseLeave={() => setHoveredElement(null)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-blue-extralight px-3 font-medium text-blue-primary text-sm transition-colors duration-200 hover:bg-blue-light"
            >
              {/*TODO examine*/}
              {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <p onClick={handleCollapseOrExpand}>
                {!isAddingCode
                  ? !discountApplied
                    ? "Add code"
                    : "Expand"
                  : "Collapse"}
              </p>
              <Image
                src={handleCodeIconDisplay()}
                alt="Add code icon"
                className="w-4 h-4"
              />
            </div>
          </div>

          {isAddingCode && (
            <PromoCodeForm
              applyDiscount={applyDiscount}
              discountApplied={discountApplied}
              setDiscountApplied={setDiscountApplied}
            />
          )}
          {discountApplied && (
            <p className="mt-1 ml-4 font-medium text-sm text-teal-500">
              {discountApplied}% discount applied!
            </p>
          )}
        </section>
        <section className="mt-2 flex flex-col">
          <div className="mb-2 flex border-gray-primary border-b pb-2">
            <div className="mb-2 flex grow gap-2">
              <h2 className="border-blue-primary border-l-4 pl-3 font-semibold text-gray-800 text-xl tracking-wide">
                Shipping
              </h2>
            </div>
            <Link
              ref={changeShippingLinkRef}
              href="/checkout/shipping-and-billing?edit=shipping"
              onMouseEnter={() =>
                setHoveredElement(changeShippingLinkRef.current)
              }
              onMouseLeave={() => setHoveredElement(null)}
              className="inline-flex items-center gap-1 rounded-full bg-blue-extralight px-3 font-medium text-blue-primary text-sm transition-colors duration-200 hover:bg-blue-light"
            >
              <Image
                src={editIcon}
                alt="Edit billing info icon"
                className="h-4 w-4"
              />
              Change
            </Link>
          </div>
          <div className="flex flex-col gap-1 px-4 text-sm">
            <p>{shippingEmail}</p>
            <p>{shippingName}</p>
            <p>{shippingAddress}</p>
            <p>{shippingZip}</p>
            <p>{shippingRegion}</p>
            <p>{shippingCountry}</p>
            {shippingPhoneCode && shippingPhoneNumber && (
              <p className="flex gap-1">
                <span>(+{shippingPhoneCode})</span>
                <span>{shippingPhoneNumber}</span>
              </p>
            )}
          </div>
        </section>

        <section className="mt-2 flex flex-col">
          <div className="mb-2 flex border-gray-primary border-b pb-1">
            <div className="mb-2 flex grow gap-2">
              <h2 className="border-blue-primary border-l-4 pl-3 font-semibold text-gray-800 text-xl tracking-wide">
                Billing
              </h2>
            </div>
            <Link
              ref={changeBillingLinkRef}
              href="/checkout/shipping-and-billing?edit=billing"
              onMouseEnter={() =>
                setHoveredElement(changeBillingLinkRef.current)
              }
              onMouseLeave={() => setHoveredElement(null)}
              className="inline-flex items-center gap-1 rounded-full bg-blue-extralight px-3 font-medium text-blue-primary text-sm transition-colors duration-200 hover:bg-blue-light"
            >
              <Image
                src={editIcon}
                alt="Edit billing info icon"
                className="h-4 w-4"
              />
              Change
            </Link>
          </div>

          <div className="flex flex-col gap-1 px-4 text-sm">
            {isBillingSameAsShipping() ? (
              <p className="text-sm">(Same as delivery)</p>
            ) : (
              <>
                <p>{billingEmail}</p>
                <p>{billingName}</p>
                <p>{billingAddress}</p>
                <p>{billingZip}</p>
                <p>{billingRegion}</p>
                <p>{billingCountry}</p>
                {billingPhoneCode && billingPhoneNumber && (
                  <p className="flex gap-1">
                    <span>(+{billingPhoneCode})</span>
                    <span>{billingPhoneNumber}</span>
                  </p>
                )}
              </>
            )}
          </div>
        </section>

        <section className="mt-2 flex flex-col">
          <div className="mb-2 flex border-gray-primary border-b pb-1">
            <div className="mb-2 flex grow gap-2">
              <h2 className="border-blue-primary border-l-4 pl-3 font-semibold text-gray-800 text-xl tracking-wide">
                Summary
                <span className="self-end"> (5 items)</span>
              </h2>
            </div>
            {/*<h2 className="flex gap-2 grow">*/}
            {/*  <span className="text-xl">Summary</span>*/}
            {/*</h2>*/}
            <Link
              ref={changeCartLinkRef}
              href="/cart"
              onMouseEnter={() => setHoveredElement(changeCartLinkRef.current)}
              onMouseLeave={() => setHoveredElement(null)}
              className="inline-flex items-center gap-1 rounded-full bg-blue-extralight px-3 font-medium text-blue-primary text-sm transition-colors duration-200 hover:bg-blue-light"
            >
              <Image
                src={editIcon}
                alt="Edit billing info icon"
                className="h-4 w-4"
              />
              Change
            </Link>
          </div>
          <Table discountApplied={discountApplied} />
        </section>
      </div>
    </section>
    // </PromoCodeContext.Provider>
  );
}
