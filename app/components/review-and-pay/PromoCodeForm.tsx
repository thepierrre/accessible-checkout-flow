"use client";

import { clsx } from "clsx";
import Image from "next/image";
import {
  BaseSyntheticEvent,
  type Dispatch,
  FormEvent,
  type SetStateAction,
  useRef,
  useState,
  useId,
} from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { getDiscount as getDiscountAction } from "@/app/lib/actions";
import removeIcon from "../../../public/icons/removeIcon.svg";
import removeIconHover from "../../../public/icons/removeIconHover.svg";
import Button from "@/app/components/shared/Button";

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
  const promoCodeInputId = useId();
  const promoCodeFormId = useId();
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
        id={promoCodeFormId}
        name="promo-code-form"
        onSubmit={handleSubmit(onValidFormSubmit, onInvalidFormSubmit)}
        className="mx-2 flex w-full flex-col p-2"
      >
        <div className="flex w-full gap-2">
          <div className="relative w-full">
            <input
              id={promoCodeInputId}
              {...register("promoCode")}
              placeholder="Enter code here"
              autoComplete="off"
              disabled={discountApplied !== undefined}
              className={clsx(
                "h-10 w-full rounded-md border px-2 text-base focus:outline-none focus:ring-1",
                errors.promoCode?.message
                  ? "border-red-primary focus:ring-red-primary"
                  : "border-gray-300 focus:border-blue-primary focus:ring-blue-primary",
                discountApplied
                  ? "cursor-not-allowed border-teal-500 bg-teal-50 pl-6 font-medium text-teal-500"
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
              type="submit"
              className="h-10 w-20 text-white text-sm rounded-md self-end mb-0.5 mr-3 disabled:cursor-not-allowed bg-blue-primary hover:bg-blue-semidark disabled:bg-blue-semilight"
              disabled={isInputEmpty || errors.promoCode?.message !== undefined}
            >
              Apply
            </button>
          ) : (
            //TODO examine this
            // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
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
                className="h-6 w-6"
              />
            </div>
          )}
        </div>
        <p
          className={clsx(
            "overflow-hidden text-red-primary text-sm transition-[max-height] duration-700",
            errors.promoCode?.message ? "max-h-8" : "max-h-0",
          )}
        >
          {errors.promoCode?.message ?? ""}
        </p>
      </form>
    </div>
  );
}
