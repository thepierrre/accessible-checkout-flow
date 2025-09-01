"use client";

import { Elements } from "@stripe/react-stripe-js";
import {
  type Appearance,
  loadStripe,
  type StripeElementsOptions,
} from "@stripe/stripe-js";
import CardCheckout from "@/app/components/review-and-pay/CardCheckout";
import ExpressCheckout from "@/app/components/review-and-pay/ExpressCheckout";
import ReviewOrder from "@/app/components/review-and-pay/ReviewOrder";
import { convertToSubcurrency } from "@/app/lib/convertToSubcurrency";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined.");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function PaymentPage() {
  const expressCheckoutVars = {
    borderRadius: "0.5rem",
  };

  const appearance: Appearance = {
    theme: "flat",
    variables: {
      borderRadius: "0.375rem",
      colorBackground: "white",
      colorDanger: "#ff174d",
    },
    rules: {
      ".Label": {
        fontWeight: "500",
      },
      ".Input": {
        border: "1px solid #333",
        padding: "0.5rem",
        fontSize: "0.875rem",
      },
      ".Input:focus": {
        outline: "1px solid #3f5ad8",
        boxShadow: "none",
      },
      ".Input--invalid": {
        border: "1px solid var(--colorDanger)",
        outline: "none",
        boxShadow: "none",
      },
      ".Input--invalid:focus": {
        outline: "1px solid var(--colorDanger)",
        boxShadow: "none",
      },
    },
  };

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: convertToSubcurrency(20.99),
    currency: "eur",
    appearance: appearance,
  };

  return (
    <main className="mx-auto w-160 rounded-xl bg-gradient-to-br from-white to-gray-50 p-10 shadow-md">
      <ReviewOrder />
      <div className="flex w-full flex-col">
        <div className="my-6">
          <span className="rounded-full bg-blue-extralight px-2 py-0.5 text-blue-primary text-sm tracking-wide">
            Step 3 of 3
          </span>
        </div>
        <div className="flex flex-col">
          <h1 className="relative mb-4 inline-block font-bold text-3xl text-gray-900 uppercase tracking-wide">
            Select payment
            <span className="-bottom-2 absolute left-0 h-1 w-[100%] bg-blue-primary"></span>
          </h1>
          <h2 className="mb-6 w-full text-gray-dark">
            Choose express checkout or pay by card.
          </h2>
        </div>

        <div className="flex w-full flex-col gap-6 rounded-lg border border-gray-primary p-8">
          <Elements
            stripe={stripePromise}
            options={{
              ...options,
              appearance: { ...appearance, variables: expressCheckoutVars },
            }}
          >
            <ExpressCheckout amount={20.99} />
          </Elements>
          <Elements stripe={stripePromise} options={options}>
            <CardCheckout amount={20.99} />
          </Elements>
        </div>
      </div>
    </main>
  );
}
