import Table from "@/app/components/review-and-pay/Table";
import editIcon from "../../../public/icons/editIcon.svg";
import editIconHover from "../../../public/icons/editIconHover.svg";
import expandIcon from "../../../public/icons/expandIcon.svg";
import expandIconHover from "../../../public/icons/expandIconHover.svg";
import questionIcon from "../../../public/icons/questionIcon.svg";
import collapseIcon from "../../../public/icons/collapseIcon.svg";
import collapseIconHover from "../../../public/icons/collapseIconHover.svg";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState, useId} from "react";
import PromoCodeForm from "@/app/components/review-and-pay/PromoCodeForm";
import {
    getAddressData,
    isBillingSameAsShipping,
} from "@/app/lib/addressDataUtils";
import {AddressData} from "@/app/checkout/models";
import Tooltip from "@/app/components/shared/Tooltip";
//import PromoCodeContext from "@/app/context/PromoCodeContext";

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

    //name: string     address: string     zip: string     region?: string     country: string     phone: {         code: string         number: string     }


    // function addressDataUtils() {
    //   const addressData = JSON.parse(
    //     sessionStorage.getItem("addressFormData") ?? "",
    //   );
    //   console.log(addressData);
    //
    //   return {
    //     shipping: addressData.shipping,
    //     billing: addressData.billing,
    //   };
    // }

    // function isBillingSameAsShipping() {
    //   const { shipping, billing } = addressDataUtils();
    //
    //   return JSON.stringify(shipping) === JSON.stringify(billing);
    // }

    useEffect(() => {
        const {shipping, billing} = getAddressData();
        setShipping(shipping);
        setBilling(billing);
    }, []);

    // function handleApply() {
    //   setIsAddingCode(false);
    // }

    if (!shipping) return;

    const {
        email: shippingEmail,
        name: shippingName,
        address: shippingAddress,
        zip: shippingZip,
        region: shippingRegion,
        country: shippingCountry,
        phone: {code: shippingPhoneCode, number: shippingPhoneNumber} = {}
    } = shipping;

    const {
        email: billingEmail,
        name: billingName,
        address: billingAddress,
        zip: billingZip,
        region: billingRegion,
        country: billingCountry,
        phone: {
            code: billingPhoneCode,
            number: billingPhoneNumber,
        } = {},
    } = billing ?? {}

    function handleCollapseOrExpand() {
        setIsAddingCode(!isAddingCode);
    }

    function applyDiscount(discount: number) {
        setDiscountApplied(discount);
    }

    function handleCodeIconDisplay() {
        if (hoveredElement && hoveredElement === changeCartLinkRef.current) {
            if (isAddingCode) {
                return collapseIconHover;
            } else {
                return expandIconHover;
            }
        } else {
            if (isAddingCode) {
                return collapseIcon;
            } else {
                return expandIcon;
            }
        }
    }

    if (!shipping || !billing) {
        return;
    }

    return (
        // <PromoCodeContext.Provider value={}>
        <section className="w-full">
            <div className="flex flex-col items-center mx-auto">
                <h1 className="text-3xl w-full mb-2 font-medium">Review order</h1>
                <h2 className="mb-6 w-full text-gray-dark">
                    Take a moment to ensure everything is correct.
                </h2>
            </div>
            <section className="flex flex-col gap-4">
                <section className="flex flex-col bg-white p-4 border border-gray-primary rounded-lg">
                    <div className="flex px-4">
                        <div className="flex grow gap-2 mb-2">
                            <h2 className="text-xl">Promo code</h2>
                            <Tooltip
                                label="Promo codes can't be combined."
                                position="right"
                                id={tooltipId}
                            >
                                {(triggerProps) => (
                                    <Image
                                        tabIndex={0}
                                        src={questionIcon}
                                        alt=""
                                        {...triggerProps}
                                    />
                                )}
                            </Tooltip>
                            {/*<div*/}
                            {/*  ref={questionIconDivRef}*/}
                            {/*  onMouseEnter={() =>*/}
                            {/*    setHoveredElement(questionIconDivRef.current)*/}
                            {/*  }*/}
                            {/*  onMouseLeave={() => setHoveredElement(null)}*/}
                            {/*  className="relative flex cursor-pointer"*/}
                            {/*>*/}

                            {/*  {hoveredElement &&*/}
                            {/*    hoveredElement === questionIconDivRef.current && (*/}
                            {/*      <div className="absolute whitespace-nowrap z-50 left-8 p-2 text-xs rounded-md shadow-md border border-blue-dark">*/}
                            {/*        <p>Promo codes can&#39;t be combined.</p>*/}
                            {/*      </div>*/}
                            {/*    )}*/}
                            {/*</div>*/}
                        </div>

                        <div
                            onMouseEnter={() => setHoveredElement(changeCartLinkRef.current)}
                            onMouseLeave={() => setHoveredElement(null)}
                            className="flex gap-1 text-blue-primary hover:text-blue-dark cursor-pointer"
                        >
                            <p
                                onClick={handleCollapseOrExpand}
                                className="text-sm self-center text-blue-primary hover:text-blue-dark"
                            >
                                {!isAddingCode
                                    ? !discountApplied
                                        ? "Add code"
                                        : "Expand"
                                    : "Collapse"}
                            </p>
                            <Image
                                src={handleCodeIconDisplay()}
                                alt="Add code icon"
                                className="w-4 h-4 self-center"
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
                        <p className="text-sm ml-4 text-teal-500 font-medium mt-1">
                            {discountApplied}% discount applied!
                        </p>
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
                        <p>{shippingEmail}</p>
                        <p>{shippingName}</p>
                        <p>{shippingAddress}</p>
                        <p>{shippingZip}</p>
                        <p>{shippingRegion}</p>
                        <p>{shippingCountry}</p>
                        {shippingPhoneCode && shippingPhoneNumber && <p className="flex gap-1">
                            <span>(+{shippingPhoneCode})</span>
                            <span>{shippingPhoneNumber}</span>
                        </p>}
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
                                {billingPhoneCode && billingPhoneNumber && (<p className="flex gap-1">
                                    <span>(+{billingPhoneCode})</span>
                                    <span>{billingPhoneNumber}</span>
                                </p>)}
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
                    <Table discountApplied={discountApplied}/>
                </section>
            </section>
        </section>
        // </PromoCodeContext.Provider>
    );
}
