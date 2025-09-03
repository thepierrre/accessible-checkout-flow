"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type {
  PaymentRequest,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import * as stripeJs from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { convertToSubcurrency } from "@/app/lib/convertToSubcurrency";
import Button from "@/app/components/shared/Button";

interface Props {
  amount: number;
}

export default function CardCheckout({ amount }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null,
  );

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((response) => response.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  async function handleCardCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error: confirmPaymentError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (confirmPaymentError) {
      setErrorMessage(confirmPaymentError.message);
    }

    setLoading(false);
  }

  // FIXME: Improve the UX for the loading state.
  if (!clientSecret || !stripe || !elements) {
    return <div>Loading...</div>;
  }

  const options: StripePaymentElementOptions = {
    wallets: {
      googlePay: "never",
      applePay: "never",
    },
    paymentMethodOrder: ["card"],
    layout: {
      type: "tabs",
    },
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {clientSecret && (
        <form
          onSubmit={handleCardCheckout}
          className="flex child:w-full flex-col gap-4"
        >
          <PaymentElement options={options} />
          <Button label={`Pay €${amount}`} barButton={true} />
        </form>
      )}
    </div>
  );
}
