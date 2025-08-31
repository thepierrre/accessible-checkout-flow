import {RefObject, SetStateAction, useEffect} from "react";
import {ReadonlyURLSearchParams} from "next/navigation";
import {UseFormSetValue} from "react-hook-form";
import {CombinedAddressFormData} from "@/app/checkout/models";

interface useEditModeProps {
    searchParams: ReadonlyURLSearchParams;
    shippingAddressRef: RefObject<HTMLFieldSetElement | null>;
    billingAddressRef: RefObject<HTMLFieldSetElement | null>;
    isEditing: boolean | "shipping" | "billing";
    setIsEditing: (value: SetStateAction<boolean | "shipping" | "billing">) => void
    setValue: UseFormSetValue<CombinedAddressFormData>
}

export default function useEditMode({
                                        searchParams,
                                        shippingAddressRef,
                                        billingAddressRef,
                                        isEditing,
                                        setIsEditing,
                                        setValue
                                    }: useEditModeProps) {
    useEffect(() => {
        const searchParam = searchParams.get("edit");
        console.log(searchParam);

        if (searchParam === "shipping" && shippingAddressRef.current) {
            setIsEditing("shipping");
            shippingAddressRef.current.scrollIntoView({
                block: "start",
                behavior: "instant",
            });
        } else if (searchParam === "billing") {
            setIsEditing("billing");
        }
    }, [searchParams, setIsEditing, shippingAddressRef]);

    useEffect(() => {
        if (isEditing === "billing" && billingAddressRef.current) {
            billingAddressRef.current.scrollIntoView({
                block: "start",
                behavior: "instant",
            });
        }
    }, [isEditing, billingAddressRef]);

    useEffect(() => {
        const searchParam = searchParams.get("edit");
        if (searchParam === "billing") {
            setIsEditing("billing");
            setValue("isBillingAddressSame", false, {shouldValidate: true});
        }
    }, [searchParams, setValue]);
}