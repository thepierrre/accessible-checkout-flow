"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentRequestButtonElement,
  ExpressCheckoutElement,
  useCheckout,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { convertToSubcurrency } from "@/app/lib/convertToSubcurrency";
import { PaymentRequest, StripePaymentElementOptions } from "@stripe/stripe-js";

interface Props {
  amount: number;
}

export default function PaymentContainer({ amount }: Props) {
  const checkout = useCheckout();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null,
  );

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   if (stripe) {
  //     const pr: PaymentRequest | null = stripe.paymentRequest({
  //       country: "DE",
  //       currency: "eur",
  //       total: {
  //         label: "Demo total",
  //         amount: convertToSubcurrency(amount),
  //       },
  //       requestPayerName: true,
  //       requestPayerEmail: true,
  //     });
  //
  //     // Check the availability of the Payment Request API.
  //
  //     if (pr) {
  //       pr.canMakePayment().then((result) => {
  //         if (result) {
  //           setPaymentRequest(pr);
  //         }
  //       });
  //     }
  //   }
  // }, [stripe, amount]);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

  const stripeOptions: StripePaymentElementOptions = {
    layout: {
      type: "tabs",
    },
    wallets: {
      googlePay: "auto",
    },
  };

  return (
    <section className="w-112">
      <h1>Payment details</h1>
      <form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement options={stripeOptions} />}
      </form>
    </section>
  );
}
