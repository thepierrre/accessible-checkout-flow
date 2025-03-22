"use client";

import { Elements } from "@stripe/react-stripe-js";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { convertToSubcurrency } from "@/app/lib/convertToSubcurrency";
import ExpressCheckout from "@/app/components/review-and-pay/ExpressCheckout";
import ReviewOrder from "@/app/components/review-and-pay/ReviewOrder";
import CardCheckout from "@/app/components/review-and-pay/CardCheckout";

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
    <main className="flex flex-col gap-12 items-center my-8 mx-auto w-2/5">
      <ReviewOrder />
      <div className="w-full flex flex-col">
        {/*<h1 className="text-3xl mb-8 font-medium">Choose payment</h1>*/}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl w-full mb-2 font-medium">Select payment</h1>
          <h2 className="mb-6 w-full text-gray-dark">
            Choose express checkout or pay by card.
          </h2>
        </div>

        <div className="flex flex-col gap-6 w-full border border-gray-primary rounded-lg p-8">
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
