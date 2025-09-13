"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState, type FormEvent } from "react";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";
import Button from "@/components/shared/Button";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useAppMessage } from "@/context/AppMessageContext";
import ErrorComponent from "@/components/shipping-and-billing/ErrorComponent";

interface Props {
  amount: number;
  clientSecret: string;
}

export default function CardCheckout({ amount, clientSecret }: Props) {
  const { isOnline, notifyOffline } = useOnlineStatus();
  const { appMessage, setAppMessage, clearAppMessage } = useAppMessage();
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const elements = useElements();

  if (!stripe || !elements) {
    return <div>Loading card form…</div>;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isOnline) {
      notifyOffline();
      return;
    }

    clearAppMessage();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setIsLoading(false);
      if (submitError.type === "validation_error") {
        console.error(submitError.message);
        return;
      }
      setAppMessage(submitError.message || "Invalid payment details");
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
      console.error(error);
    }

    setIsLoading(false);
  }

  const options: StripePaymentElementOptions = {
    wallets: { googlePay: "never", applePay: "never" },
    paymentMethodOrder: ["card"],
    layout: { type: "tabs" },
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement options={options} />
      {!isOnline && appMessage && <ErrorComponent errorMessage={appMessage} />}
      <Button
        type="submit"
        label={`Pay €${amount}`}
        barButton
        disabled={isLoading}
        isLoading={isLoading}
      />
    </form>
  );
}
