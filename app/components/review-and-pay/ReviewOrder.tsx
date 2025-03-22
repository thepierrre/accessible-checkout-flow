import Table from "@/app/components/review-and-pay/Table";
import editIcon from "../../../public/icons/editIcon.svg";
import editIconHover from "../../../public/icons/editIconHover.svg";
import plusIcon from "../../../public/icons/plusIcon.svg";
import plusIconHover from "../../../public/icons/plusIconHover.svg";
import questionIcon from "../../../public/icons/questionIcon.svg";
import questionIconHover from "../../../public/icons/questionIconHover.svg";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import PromoCodeForm from "@/app/components/review-and-pay/PromoCodeForm";

export default function ReviewOrder() {
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
  const questionIconDivRef = useRef<HTMLDivElement | null>(null);

  function getAddressData() {
    const addressData = JSON.parse(
      sessionStorage.getItem("addressFormData") ?? "",
    );
    console.log(addressData);

    return {
      shipping: addressData.shipping,
      billing: addressData.billing,
    };
  }

  function isBillingSameAsShipping() {
    const { shipping, billing } = getAddressData();

    return JSON.stringify(shipping) === JSON.stringify(billing);
  }

  const { shipping, billing } = getAddressData();

  function handleApply() {
    setIsAddingCode(false);
  }

  function handleAddCode() {
    setIsAddingCode(!isAddingCode);
  }

  function applyDiscount(discount: number) {
    setDiscountApplied(discount);
  }

  return (
    <section className="w-full">
      <div className="flex flex-col items-center mx-auto">
        <h1 className="text-3xl w-full mb-2 font-medium">Review order</h1>
        <h2 className="mb-6 w-full text-gray-dark">
          Take a moment to ensure everything is correct.
        </h2>
      </div>
      <section className="flex flex-col gap-4">
        <section className="flex flex-col bg-white p-4 gap-4 border border-gray-primary rounded-lg">
          <div className="flex px-4">
            <div className="flex grow gap-2">
              <h2 className="text-xl">Promo code</h2>
              <div
                ref={questionIconDivRef}
                onMouseEnter={() =>
                  setHoveredElement(questionIconDivRef.current)
                }
                onMouseLeave={() => setHoveredElement(null)}
                className="relative flex cursor-pointer"
              >
                <Image
                  src={
                    hoveredElement &&
                    hoveredElement === questionIconDivRef.current
                      ? questionIconHover
                      : questionIcon
                  }
                  alt="Add code icon"
                  className="w-5 h-5 self-center"
                />
                {hoveredElement &&
                  hoveredElement === questionIconDivRef.current && (
                    <div className="absolute whitespace-nowrap z-50 left-8 p-2 text-xs bg-blue-extralight rounded-md shadow-md">
                      <p>Promo codes can&#39;t be combined.</p>
                    </div>
                  )}
              </div>
            </div>

            <div
              onMouseEnter={() => setHoveredElement(changeCartLinkRef.current)}
              onMouseLeave={() => setHoveredElement(null)}
              className="flex gap-1 text-blue-primary hover:text-blue-dark cursor-pointer"
            >
              <Image
                src={
                  hoveredElement && hoveredElement === changeCartLinkRef.current
                    ? plusIconHover
                    : plusIcon
                }
                alt="Add code icon"
                className="w-4 h-4 self-center"
              />
              <p
                onClick={handleAddCode}
                className="text-sm self-center text-blue-primary hover:text-blue-dark"
              >
                Add code
              </p>
            </div>
          </div>

          {isAddingCode && (
            <PromoCodeForm
              applyDiscount={applyDiscount}
              discountApplied={discountApplied}
              setDiscountApplied={setDiscountApplied}
            />
          )}
        </section>
        <section className="bg-white p-4 rounded-lg border border-gray-primary">
          <div className="flex border-b border-gray-primary pb-2 px-4 mb-2">
            <h2 className="grow text-xl">Shipping</h2>
            <Link
              ref={changeShippingLinkRef}
              href="/checkout/shipping-and-billing?edit=shipping"
              onMouseEnter={() =>
                setHoveredElement(changeShippingLinkRef.current)
              }
              onMouseLeave={() => setHoveredElement(null)}
              className="flex gap-1"
            >
              <Image
                src={
                  hoveredElement &&
                  hoveredElement === changeShippingLinkRef.current
                    ? editIconHover
                    : editIcon
                }
                alt="Edit shipping info icon"
                className="w-4 h-4 self-center"
              />

              <p className="text-sm self-center text-blue-primary hover:text-blue-dark">
                Change
              </p>
            </Link>
          </div>
          <div className="flex flex-col gap-1 text-sm px-4 ">
            <p>{shipping.email}</p>
            <p>{shipping.name}</p>
            <p>{shipping.address}</p>
            <p>{shipping.zip}</p>
            <p>{shipping.region}</p>
            <p>{shipping.country}</p>
            <p className="flex gap-1">
              <span>(+{shipping.phoneCode})</span>
              <span>{shipping.phoneNumber}</span>
            </p>
          </div>
        </section>

        <section className="flex flex-col bg-white p-4 rounded-lg border border-gray-primary">
          <div className="flex border-b border-gray-primary pb-1 px-4 mb-2">
            <h2 className="grow text-xl">Billing</h2>
            <Link
              ref={changeBillingLinkRef}
              href="/checkout/shipping-and-billing?edit=billing"
              onMouseEnter={() =>
                setHoveredElement(changeBillingLinkRef.current)
              }
              onMouseLeave={() => setHoveredElement(null)}
              className="flex gap-1"
            >
              <Image
                src={
                  hoveredElement &&
                  hoveredElement === changeBillingLinkRef.current
                    ? editIconHover
                    : editIcon
                }
                alt="Edit billing info icon"
                className="w-4 h-4 self-center"
              />

              <p className="text-sm self-center text-blue-primary hover:text-blue-dark">
                Change
              </p>
            </Link>
          </div>

          <div className="flex flex-col gap-1 text-sm px-4 ">
            {!isBillingSameAsShipping() ? (
              <p className="text-sm">(Same as delivery)</p>
            ) : (
              <>
                <p>{billing.email}</p>
                <p>{billing.name}</p>
                <p>{billing.address}</p>
                <p>{billing.zip}</p>
                <p>{billing.region}</p>
                <p>{billing.country}</p>
                <p className="flex gap-1">
                  <span>(+{billing.phoneCode})</span>
                  <span>{billing.phoneNumber}</span>
                </p>
              </>
            )}
          </div>
        </section>

        <section className="flex flex-col bg-white p-4 rounded-lg border border-gray-primary">
          <div className="flex border-b border-gray-primary pb-1 px-4 mb-2">
            <h2 className="flex gap-2 grow">
              <span className="text-xl">Summary</span>
              <span className="self-end">(5 items)</span>
            </h2>
            <Link
              ref={changeCartLinkRef}
              href="/cart"
              onMouseEnter={() => setHoveredElement(changeCartLinkRef.current)}
              onMouseLeave={() => setHoveredElement(null)}
              className="flex gap-1"
            >
              <Image
                src={
                  hoveredElement && hoveredElement === changeCartLinkRef.current
                    ? editIconHover
                    : editIcon
                }
                alt="Edit cart icon"
                className="w-4 h-4 self-center"
              />

              <p className="text-sm self-center text-blue-primary hover:text-blue-dark">
                Change
              </p>
            </Link>
          </div>
          <Table discountApplied={discountApplied} />
        </section>
      </section>
    </section>
  );
}
