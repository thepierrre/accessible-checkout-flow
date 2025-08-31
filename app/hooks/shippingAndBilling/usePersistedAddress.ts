import {useEffect} from "react";
import {getAddressData, isBillingSameAsShipping} from "@/app/lib/addressDataUtils";
import {CombinedAddressFormData} from "@/app/checkout/models";
import {UseFormSetValue} from "react-hook-form";

export default function usePersistedAddress(setValue: UseFormSetValue<CombinedAddressFormData>) {
    useEffect(() => {
        const {shipping, billing} = getAddressData();
        if (shipping && billing && isBillingSameAsShipping()) {
            setValue("shipping", shipping);
        } else if (shipping && billing && !isBillingSameAsShipping()) {
            setValue("shipping", shipping);
            setValue("billing", billing);
            setValue("isBillingAddressSame", false);
        }
    }, [setValue]);
}