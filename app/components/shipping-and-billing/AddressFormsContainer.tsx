"use client";
import "country-flag-icons/3x2/flags.css";
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import AddressForm from "@/app/components/shipping-and-billing/AddressForm";
import {
    AddressType,
    CombinedAddressFormData,
    combinedAddressFormSchema,
    CountriesWithCodes,
} from "@/app/checkout/models";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import NavigationButtons from "@/app/components/shipping-and-billing/NavigationButtons";
import ErrorContainer from "@/app/components/shipping-and-billing/ErrorContainer";
import BillingCheckbox from "@/app/components/shipping-and-billing/BillingCheckbox";
import {submitAddressForm as submitAddressFormAction} from "@/app/lib/actions";
import {useRouter, useSearchParams} from "next/navigation";

import {getCountryMatchesForNames} from "@/app/lib/countryQueries";

interface Props {
    //allCountries: string[];
    //getCountriesForQueryAction: (query: string) => Promise<string[]>;
    countriesWithCodes: CountriesWithCodes;
}

export default function AddressFormsContainer({
                                                  //allCountries,
                                                  //getCountriesForQueryAction,
                                                  countriesWithCodes,
                                              }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [suggestedCountries, setSuggestedCountries] =
        useState<CountriesWithCodes>(countriesWithCodes);
    const [isEditing, setIsEditing] = useState<boolean | "shipping" | "billing">(
        false,
    );
    const [serverError, setServerError] = useState<string | null>(null);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(true);

    const shippingAddressRef = useRef<HTMLFieldSetElement | null>(null);
    const billingAddressRef = useRef<HTMLFieldSetElement | null>(null);
    const billingCheckboxRef = useRef<HTMLInputElement | null>(null);
    const serverErrorRef = useRef<HTMLElement | null>(null);

    const form = useForm<CombinedAddressFormData>({
        resolver: zodResolver(combinedAddressFormSchema),
        mode: "all",
        defaultValues: {
            shipping: {
                name: "",
                address: "",
                zip: "",
                country: "",
                phoneCode: "+1",
                phoneNumber: "",
                email: "",
                region: "",
            },
            billing: {
                name: "",
                address: "",
                zip: "",
                country: "",
                phoneCode: "+1",
                phoneNumber: "",
                email: "",
                region: "",
            },
            isBillingAddressSame: true,
        },
    });

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        clearErrors,
        formState: {errors, isSubmitting},
    } = form;

    const isBillingSame = watch("isBillingAddressSame");

    // useEffect(() => {
    //   const { shipping, billing } = getAddressData();
    //   if (shipping && billing && isBillingSameAsShipping()) {
    //     console.log(isBillingSameAsShipping());
    //     setValue("shipping", shipping);
    //   } else if (shipping && billing && !isBillingSameAsShipping()) {
    //     setValue("shipping", shipping);
    //     setValue("billing", billing);
    //     setValue("isBillingAddressSame", false);
    //   }
    // }, [setValue]);

    useEffect(() => {
        if (serverErrorRef.current) {
            serverErrorRef.current.scrollIntoView({
                block: "start",
                behavior: "smooth",
            });
        }
    });

    useEffect(() => {
        if (!isBillingSame && billingAddressRef.current) {
            setIsCheckboxChecked(false);
            billingAddressRef.current.scrollIntoView({
                block: "start",
                behavior: "smooth",
            });
        }
    }, [isBillingSame]);

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
    }, [searchParams]);

    useEffect(() => {
        if (isEditing === "billing" && billingAddressRef.current) {
            billingAddressRef.current.scrollIntoView({
                block: "start",
                behavior: "instant",
            });
        }
    }, [isEditing]);

    useEffect(() => {
        if (billingCheckboxRef.current) {
            const checkbox = billingCheckboxRef.current;

            function onCheckboxEnterPress(event: KeyboardEvent) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    checkbox.click();
                }
            }

            checkbox.addEventListener("keydown", onCheckboxEnterPress);
            return () =>
                checkbox.removeEventListener("keydown", onCheckboxEnterPress);
        }
    });

    const onCheckboxChange = () => {
        const currentIsBillingSame: boolean = getValues("isBillingAddressSame");
        const newIsBillingSame: boolean = !currentIsBillingSame;

        if (newIsBillingSame) {
            setTimeout(() => {
                setValue("isBillingAddressSame", true);
            }, 550);
            setIsCheckboxChecked(true);
            setIsEditing(false);
            setValue("billing", getValues("shipping"));
            window.scrollTo({top: 0, behavior: "smooth"});
        } else {
            setValue("isBillingAddressSame", newIsBillingSame);
            setValue("billing", {
                name: "",
                address: "",
                zip: "",
                country: "",
                phoneCode: "+1",
                phoneNumber: "",
                email: "",
                region: "",
            });
            clearErrors("billing");
        }
    };

    async function onCountryInputChange(
        addressType: AddressType,
        event: ChangeEvent<HTMLInputElement>,
    ) {
        const {value} = event.target;

        setValue(`${addressType}.country`, value);

        const foundCountries = value
            ? getCountryMatchesForNames(countriesWithCodes, value)
            : countriesWithCodes;
        setSuggestedCountries(foundCountries);
    }

    function onSuggestedCountryClick(country: string, addressType: AddressType) {
        setValue(`${addressType}.country`, country, {shouldValidate: true});
    }

    function onCountryPhoneCodeClick(
        phoneCodeNum: number,
        addressType: AddressType,
    ) {
        const phoneCode = phoneCodeNum.toString();
        setValue(`${addressType}.phoneCode`, phoneCode);
    }

    function saveFormDataToSessionStorage(data: CombinedAddressFormData) {
        const dataString = JSON.stringify(data);
        sessionStorage.setItem("addressFormData", dataString);
    }

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (isBillingSame) {
            setValue("billing", getValues("shipping"));
        }
        await handleSubmit(
            async (data: CombinedAddressFormData) => {
                try {
                    const response = await submitAddressFormAction(data);
                    if (!response.success && response.errorMessage) {
                        console.error("Internal Server Error:", response.errorMessage);
                        setServerError(response.errorMessage);
                    }

                    saveFormDataToSessionStorage(data);

                    router.push("review-and-pay");
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.error("Internal Server Error:", error.message);
                        setServerError(error.message);
                    } else {
                        console.error("Internal Server Error:", error);
                        setServerError("A server error occurred. Please try again.");
                    }
                }
            },
            (errors) => {
                console.error(
                    "Failed to submit. The form has one or more errors:",
                    errors,
                );
            },
        )();
    };

    return (
        <form
            id="address-form"
            name="address-form"
            onSubmit={handleFormSubmit}
            className="p-6 border border-gray-primary rounded-lg w-144 mx-auto"
        >
            {serverError && (
                <ErrorContainer ref={serverErrorRef} errorMessage={serverError}/>
            )}
            <AddressForm
                ref={shippingAddressRef}
                addressType="shipping"
                suggestedCountries={suggestedCountries}
                countriesWithCodes={countriesWithCodes}
                onCountryInputChange={onCountryInputChange}
                onSuggestedCountryClick={onSuggestedCountryClick}
                onCountryPhoneCodeClick={onCountryPhoneCodeClick}
                register={register}
                watch={watch}
                errors={errors}
                setValue={setValue}
            />
            <BillingCheckbox
                ref={billingCheckboxRef}
                checked={isCheckboxChecked}
                onChange={onCheckboxChange}
            />

            {(!isBillingSame || isEditing === "billing") && (
                <AddressForm
                    ref={billingAddressRef}
                    addressType="billing"
                    suggestedCountries={suggestedCountries}
                    countriesWithCodes={countriesWithCodes}
                    onCountryInputChange={onCountryInputChange}
                    onSuggestedCountryClick={onSuggestedCountryClick}
                    onCountryPhoneCodeClick={onCountryPhoneCodeClick}
                    register={register}
                    watch={watch}
                    errors={errors}
                    setValue={setValue}
                />
            )}
            <NavigationButtons
                isSubmitting={isSubmitting}
                currentStep="address"
                isEditing={isEditing}
            />
        </form>
    );
}
