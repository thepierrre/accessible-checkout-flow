"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentRequestButtonElement,
  ExpressCheckoutElement,
  useCheckout,
  Elements,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  CardElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { convertToSubcurrency } from "@/app/lib/convertToSubcurrency";
import { PaymentRequest, StripePaymentElementOptions } from "@stripe/stripe-js";
import * as stripeJs from "@stripe/stripe-js";

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
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
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
    <div className="flex flex-col items-center gap-8 w-full">
      {clientSecret && (
        <form onSubmit={handleCardCheckout} className="max-w-128">
          <PaymentElement options={options} />
          <button className="mt-6 py-2 w-full rounded-lg bg-blue-primary text-white hover:bg-blue-semidark focus:outline-solid focus:outline-offset-2">
            Pay €{amount}
          </button>
        </form>
      )}
    </div>
  );
}
