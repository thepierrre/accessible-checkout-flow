"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { getDiscount as getDiscountAction } from "@/app/lib/actions";
import { clsx } from "clsx";
import { Dispatch, SetStateAction } from "react";

type FormValues = {
  promoCode: string;
};

interface Props {
  applyDiscount: (discount: number) => void;
  discountApplied: number | undefined;
  setDiscountApplied: Dispatch<SetStateAction<number | undefined>>;
}

export default function PromoCodeForm({
  applyDiscount,
  discountApplied,
  setDiscountApplied,
}: Props) {
  const form = useForm<FormValues>({
    defaultValues: {
      promoCode: "",
    },
  });
  const {
    handleSubmit,
    register,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = form;

  async function onValidFormSubmit(data: FormValues) {
    if (discountApplied) {
      handleRemovePromoCode();
      return;
    }

    try {
      const { promoCode } = data;
      console.log(promoCode);

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
          applyDiscount(+message);
        }
      }
      console.log(response);
      console.log("error:", errors);
    } catch (error) {
      console.error(error);
    }
  }

  function handleRemovePromoCode() {
    setDiscountApplied(undefined);
    setValue("promoCode", "");
  }

  async function onInvalidFormSubmit(errors: FieldErrors<FormValues>) {
    console.log(errors);
  }

  const isInputEmpty = watch("promoCode") === "";

  return (
    <div className="w-full">
      <form
        id="promo-code-form"
        name="promo-code-form"
        onSubmit={handleSubmit(onValidFormSubmit, onInvalidFormSubmit)}
        className="mx-2 flex flex-col w-full p-2"
      >
        <div className="w-full flex gap-4">
          <input
            id="promo-code"
            {...register("promoCode")}
            placeholder="Enter code here"
            autoComplete="off"
            disabled={discountApplied !== undefined}
            //hidden={discountApplied !== undefined}
            className={clsx(
              "border w-full h-8 p-2 rounded-md text-sm focus:outline-none focus:outline-1 focus:outline-offset-0",
              errors.promoCode?.message
                ? "border-red-primary focus:outline-red-primary"
                : "border-black-primary focus:outline-blue-semidark ",
            )}
          ></input>
          {/*{discountApplied && (*/}
          {/*  <div className="w-full h-8 flex">*/}
          {/*    <p className="self-center text-teal-400 font-medium">*/}
          {/*      TIMEFORCOFFEE applied - {discountApplied}% discount!*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*)}*/}

          <button
            className={clsx(
              "mr-4 h-8 px-8 text-white text-sm rounded-md self-end mb-0.5 disabled:cursor-not-allowed",
              discountApplied
                ? "bg-red-primary hover:bg-red-dark"
                : "bg-blue-primary hover:bg-blue-semidark disabled:bg-blue-semilight",
            )}
            disabled={isInputEmpty || errors.promoCode?.message !== undefined}
          >
            {discountApplied ? "Remove" : "Apply"}
          </button>
        </div>
        {errors.promoCode && (
          <p className="text-sm text-red-primary mt-1">
            {errors.promoCode.message}
          </p>
        )}
        {!errors.promoCode && discountApplied && (
          <p className="text-sm text-teal-500 font-medium mt-1">
            {discountApplied}% discount applied!
          </p>
        )}
      </form>
    </div>
  );
}
