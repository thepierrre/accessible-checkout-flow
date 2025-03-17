import Button from "@/app/components/review-and-pay/Button";
import Table from "@/app/components/review-and-pay/Table";
import { useRouter } from "next/navigation";
import { FunctionComponent, useRef, useState } from "react";
import editIcon from "../../../public/icons/editIcon.svg";
import editIconHover from "../../../public/icons/editIconHover.svg";
import plusIcon from "../../../public/icons/plusIcon.svg";
import plusIconHover from "../../../public/icons/plusIconHover.svg";
import questionIcon from "../../../public/icons/questionIcon.svg";
import questionIconHover from "../../../public/icons/questionIconHover.svg";

import Image from "next/image";
import Link, { LinkProps } from "next/link";

export default function ReviewOrder() {
  const [isAddingCode, setIsAddingCode] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<
    HTMLAnchorElement | HTMLDivElement | null
  >(null);
  const router = useRouter();

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
    setIsAddingCode(true);
  }

  function handleChangeShipping() {
    router.push("/checkout/shipping-and-billing?edit=shipping");
  }

  function handleChangeBilling() {
    router.push("/checkout/shipping-and-billing?edit=billing");
  }

  function handleChangeCart() {
    router.push("/cart");
  }

  return (
    <section className="w-1/2 h-full p-14 bg-blue-extralight text-gray-dark">
      <h1 className="text-3xl mb-6 font-medium">1. Review order</h1>
      <section className="flex flex-col gap-4">
        <section className="flex flex-col bg-white p-4 rounded-lg gap-4">
          <div className="flex">
            <div className="flex grow gap-2">
              <h2 className="text-xl">Promo codes</h2>
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
                <div className="absolute left-8">blabla</div>
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
            <div className="flex gap-4">
              <input
                placeholder="Enter code here"
                autoComplete="off"
                className="border w-full h-8 p-2 rounded-md text-sm focus:outline-none focus:outline-1 focus:outline-offset-0 border-black-primary focus:outline-blue-semidark "
              ></input>
              <button
                onClick={handleApply}
                className="bg-blue-primary hover:bg-blue-semidark h-8 px-8 text-white text-sm rounded-md self-end mb-0.5"
              >
                Apply
              </button>
            </div>
          )}
        </section>
        <section className="bg-white p-4 rounded-lg">
          <div className="flex border-b border-gray-primary pb-2 mb-2">
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
          <div className="flex flex-col gap-1 text-sm">
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

        <section className="flex flex-col bg-white p-4 rounded-lg">
          <div className="flex border-b border-gray-primary pb-1 mb-2">
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

          <div className="flex flex-col gap-1 text-sm">
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

        <section className="flex flex-col bg-white p-4 rounded-lg">
          <div className="flex border-b border-gray-primary pb-1 mb-2">
            <h2 className="flex gap-2 grow">
              <span className="text-xl">Summary</span>
              <span className="self-end">(5 items)</span>
            </h2>
            <Link
              ref={changeCartLinkRef}
              href="/checkout/shipping-and-billing?edit=shipping"
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
          <Table />
        </section>
      </section>
    </section>
  );
}
