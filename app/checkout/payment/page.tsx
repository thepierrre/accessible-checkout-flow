"use client";

import { CheckoutProvider, Elements } from "@stripe/react-stripe-js";
import {
  loadStripe,
  StripeCheckoutOptions,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import Stepper from "@/app/ui/Stepper";
import NavigationButtons from "@/app/ui/shipping/NavigationButtons";
import { convertToSubcurrency } from "@/app/lib/convertToSubcurrency";
import PaymentContainer from "@/app/ui/payment/PaymentContainer";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined.");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function PaymentPage() {
  const stripeOptions: StripeCheckoutOptions = {
    // mode: "payment",
    // amount: convertToSubcurrency(20.99),
    // currency: "eur",
  };

  return (
    <div className="flex flex-col items-center">
      <Stepper activeLabel="Payment" />
      {/*<Elements stripe={stripePromise} options={stripeOptions}>*/}
      {/*  <PaymentContainer amount={20.99} />*/}
      {/*</Elements>*/}
      <CheckoutProvider stripe={stripePromise} options={stripeOptions}>
        <PaymentContainer amount={20.99} />
      </CheckoutProvider>
      <main className="flex flex-col gap-8 w-112">
        {/*<NavigationButtons*/}
        {/*  previousStepName="Review Order"*/}
        {/*  nextStepName="Order complete"*/}
        {/*  prevStepHref="review-order"*/}
        {/*/>*/}
      </main>
    </div>
  );
}
