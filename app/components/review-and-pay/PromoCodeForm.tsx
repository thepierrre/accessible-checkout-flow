"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { getDiscount as getDiscountAction } from "@/app/lib/actions";
import { clsx } from "clsx";
import {
  BaseSyntheticEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import removeIcon from "../../../public/icons/removeIcon.svg";
import removeIconHover from "../../../public/icons/removeIconHover.svg";

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
  const [isRemoveIconHovered, setIsRemoveIconHovered] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      promoCode: "",
    },
  });
  const removeIconRef = useRef<HTMLDivElement | null>(null);
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
        <div className="w-full flex gap-2">
          <div className="relative w-full">
            <input
              id="promo-code"
              {...register("promoCode")}
              placeholder="Enter code here"
              autoComplete="off"
              disabled={discountApplied !== undefined}
              className={clsx(
                "border w-full h-8 p-2 rounded-md text-sm focus:outline-none focus:outline-1 focus:outline-offset-0",
                errors.promoCode?.message
                  ? "border-red-primary focus:outline-red-primary"
                  : "border-black-primary focus:outline-blue-semidark ",
                discountApplied
                  ? "bg-teal-50 pl-6 cursor-not-allowed text-teal-500 font-medium border-teal-500"
                  : "pl-2",
              )}
            ></input>
            {discountApplied && (
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-teal-500">
                ✔
              </span>
            )}
          </div>

          {!discountApplied ? (
            <button
              className="h-8 w-20 text-white text-sm rounded-md self-end mb-0.5 mr-3 disabled:cursor-not-allowed bg-blue-primary hover:bg-blue-semidark disabled:bg-blue-semilight"
              disabled={isInputEmpty || errors.promoCode?.message !== undefined}
            >
              Apply
            </button>
          ) : (
            <div
              ref={removeIconRef}
              onMouseEnter={() => setIsRemoveIconHovered(true)}
              onMouseLeave={() => setIsRemoveIconHovered(false)}
              className="flex items-center mr-3 cursor-pointer"
              onClick={handleRemovePromoCode}
            >
              <Image
                src={isRemoveIconHovered ? removeIconHover : removeIcon}
                alt="Remove"
                className="w-6 h-6"
              />
            </div>
          )}
        </div>
        {errors.promoCode && (
          <p className="text-sm text-red-primary mt-1">
            {errors.promoCode.message}
          </p>
        )}
      </form>
    </div>
  );
}
