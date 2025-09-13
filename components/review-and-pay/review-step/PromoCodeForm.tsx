"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getDiscount as getDiscountAction } from "@/lib/actions";
import removeIcon from "../../../public/icons/removeIcon.svg";
import { useOrderSummary } from "@/context/OrderSummaryContext";
import Button from "@/components/shared/Button";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useAppMessage } from "@/context/AppMessageContext";
import ErrorComponent from "@/components/shipping-and-billing/ErrorComponent";
import useGeneratedIds from "@/hooks/useGeneratedIds";

type FormValues = {
  promoCode: string;
};

export default function PromoCodeForm() {
  const { isOnline, notifyOffline } = useOnlineStatus();
  const [isLoading, setIsLoading] = useState(false);
  const { appMessage, setAppMessage, clearAppMessage } = useAppMessage();
  const { discount, setDiscount, promoCode, setPromoCode } = useOrderSummary();
  const { promoCodeInputId, promoCodeFormId } = useGeneratedIds(
    "promoCodeInputId",
    "promoCodeFormId",
  );

  const form = useForm<FormValues>({
    defaultValues: {
      promoCode: promoCode || "",
    },
  });
  const {
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors },
    reset,
  } = form;

  async function onFormSubmit(data: FormValues) {
    if (!isOnline) {
      notifyOffline();
      return;
    }

    clearAppMessage();
    setIsLoading(true);

    try {
      const { promoCode } = data;

      const response = await getDiscountAction(promoCode);
      const { success, message, errorMessage } = response;
      if (!success && errorMessage) {
        setError("promoCode", {
          type: "server error",
          message: errorMessage,
        });
      } else if (success && message) {
        const isMessageNumericString = !isNaN(+(+message).toString());
        if (isMessageNumericString) {
          setDiscount(+message);
          setPromoCode(promoCode);
        }
      }
      console.log("error:", errors);
    } catch (error) {
      console.error(error);

      setAppMessage(
        typeof error === "string"
          ? error
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleRemovePromoCode() {
    setDiscount(0);
    setPromoCode("");
    reset({ promoCode: "" });
  }

  const isInputEmpty = watch("promoCode") === "";

  return (
    <div className="w-full">
      {appMessage && <ErrorComponent errorMessage={appMessage} />}
      <form
        id={promoCodeFormId}
        name="promo-code-form"
        onSubmit={handleSubmit(onFormSubmit)}
        className="mx-2 flex w-full flex-col p-2"
      >
        <div className="flex w-full gap-2">
          <div className="relative w-full">
            <input
              id={promoCodeInputId}
              {...register("promoCode")}
              placeholder="Enter code here"
              autoComplete="off"
              disabled={discount !== 0}
              className={clsx(
                "h-10 w-full rounded-md border px-2 text-md focus:outline-none focus:ring-1 sm:h-8 sm:text-sm",
                errors.promoCode?.message
                  ? "border-red-primary focus:ring-red-primary"
                  : "border-gray-300 focus:border-blue-primary focus:ring-blue-primary",
                discount
                  ? "cursor-not-allowed border-teal-500 bg-teal-50 pl-6 font-medium text-teal-500"
                  : "pl-2",
              )}
            ></input>
          </div>

          {discount === 0 ? (
            <Button
              type="submit"
              size="small"
              disabled={
                isLoading ||
                isInputEmpty ||
                errors.promoCode?.message !== undefined
              }
              label="Apply"
            />
          ) : (
            <button
              type="button"
              className="mr-3 flex cursor-pointer items-center"
              onClick={handleRemovePromoCode}
            >
              <Image src={removeIcon} alt="Remove" className="h-6 w-6" />
            </button>
          )}
        </div>
        <p
          className={clsx(
            "overflow-hidden text-red-primary text-sm transition-[max-height] duration-700",
            errors.promoCode?.message ? "mt-1 max-h-8" : "max-h-0",
          )}
        >
          {errors.promoCode?.message ?? ""}
        </p>
      </form>
    </div>
  );
}
