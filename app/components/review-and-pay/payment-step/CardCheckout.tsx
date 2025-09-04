"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState, type FormEvent } from "react";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";
import Button from "@/app/components/shared/Button";

interface Props {
  amount: number;
  clientSecret: string;
}

export default function CardCheckout({ amount, clientSecret }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!stripe || !elements) {
    return <div>Loading card form…</div>;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) return;

    // setLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message || "Invalid payment details");
      // setLoading(false);
      return;
    }

    const intentId = clientSecret?.split("_secret")[0];

    if (intentId) {
      sessionStorage.setItem("lastOrder", JSON.stringify({ intentId }));
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/order-complete?session_id={CHECKOUT_SESSION_ID}`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "Something went wrong");
      console.log("inside3");
    }
  }

  const options: StripePaymentElementOptions = {
    wallets: { googlePay: "never", applePay: "never" },
    paymentMethodOrder: ["card"],
    layout: { type: "tabs" },
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement options={options} />
      <Button type="submit" label={`Pay €${amount}`} barButton />
    </form>
  );
}
