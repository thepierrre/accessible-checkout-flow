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
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { convertToSubcurrency } from "@/app/lib/convertToSubcurrency";
import { PaymentRequest, StripePaymentElementOptions } from "@stripe/stripe-js";
import * as stripeJs from "@stripe/stripe-js";

interface Props {
  amount: number;
}

export default function ExpressCheckout({ amount }: Props) {
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
  //     // Check the availability of the ExpressCheckout Request API.
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

  // FIXME: Improve the UX for the loading state.
  if (!clientSecret || !stripe || !elements) {
    return <div>Loading...</div>;
  }

  const handleExpressCheckout = async () => {
    const { error } = await stripe.confirmPayment({
      // `Elements` instance that's used to create the Express Checkout Element.
      elements,
      // `clientSecret` from the created PaymentIntent
      clientSecret,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      // Uncomment below if you only want redirect for redirect-based payments.
      // redirect: 'if_required',
    });

    if (error) {
      console.error(error);
      // This point is reached only if there's an immediate error when confirming the review-and-pay. Show the error to your customer (for example, review-and-pay details incomplete).
    } else {
      // Your customer will be redirected to your `return_url`.
    }
  };

  return (
    <section className="flex w-full child:max-w-128 justify-center">
      {clientSecret && (
        <ExpressCheckoutElement onConfirm={handleExpressCheckout} />
      )}
    </section>
  );
}
