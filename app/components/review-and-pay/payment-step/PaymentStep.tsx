"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import CardCheckout from "@/app/components/review-and-pay/payment-step/CardCheckout";
import ExpressCheckout from "@/app/components/review-and-pay/payment-step/ExpressCheckout";
import Heading from "@/app/components/shared/Heading";
import StepBadge from "@/app/components/shared/StepBadge";
import { APPEARANCE } from "@/app/constants/stripe";
import { convertToSubcurrency } from "@/app/lib/convertToSubcurrency";

export default function PaymentStep() {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined.");
  }

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  );

  const expressCheckoutVars = {
    borderRadius: "0.5rem",
  };

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: convertToSubcurrency(20.99),
    currency: "eur",
    appearance: APPEARANCE,
  };

  return (
    <div className="flex w-full flex-col">
      <StepBadge current={3} max={3} />
      <div className="flex flex-col">
        <Heading as="h1" label="Select payment" />
        <h2 className="mb-6 w-full text-gray-dark">
          Choose express checkout or pay by card.
        </h2>
      </div>

      <div className="flex w-full flex-col gap-6 px-8">
        <Elements
          stripe={stripePromise}
          options={{
            ...options,
            appearance: { ...APPEARANCE, variables: expressCheckoutVars },
          }}
        >
          <ExpressCheckout amount={20.99} />
        </Elements>
        <Elements stripe={stripePromise} options={options}>
          <CardCheckout amount={20.99} />
        </Elements>
      </div>
    </div>
  );
}
