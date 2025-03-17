"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import Stepper from "@/app/components/Stepper";
import NavigationButtons from "@/app/components/shipping-and-billing/NavigationButtons";
import { convertToSubcurrency } from "@/app/lib/convertToSubcurrency";
import Payment from "@/app/components/review-and-pay/Payment";
import ReviewOrder from "@/app/components/review-and-pay/ReviewOrder";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined.");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function PaymentPage() {
  const stripeOptions: StripeElementsOptions = {
    mode: "payment",
    amount: convertToSubcurrency(20.99),
    currency: "eur",
  };

  return (
    <div className="flex flex-col items-center w-screen">
      {/*<Stepper activeLabel="Review & Payment" />*/}
      <main className="flex flex-row w-full h-full gap-4">
        <ReviewOrder />
        <Elements stripe={stripePromise} options={stripeOptions}>
          <Payment amount={20.99} />
        </Elements>

        {/*<NavigationButtons*/}
        {/*  previousStepName="Review Order"*/}
        {/*  nextStepName="Order complete"*/}
        {/*  prevStepHref="review-order"*/}
        {/*/>*/}
      </main>
    </div>
  );
}
