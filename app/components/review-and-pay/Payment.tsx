"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentRequestButtonElement,
  ExpressCheckoutElement,
  useCheckout,
  Elements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { convertToSubcurrency } from "@/app/lib/convertToSubcurrency";
import { PaymentRequest, StripePaymentElementOptions } from "@stripe/stripe-js";
import * as stripeJs from "@stripe/stripe-js";

interface Props {
  amount: number;
}

export default function Payment({ amount }: Props) {
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

  const options = {
    emailRequired: true,
  };

  const onConfirm = async () => {
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
      // This point is reached only if there's an immediate error when confirming the review-and-pay. Show the error to your customer (for example, review-and-pay details incomplete).
    } else {
      // Your customer will be redirected to your `return_url`.
    }
  };

  return (
    <section className="flex w-1/2 h-5/6 p-14">
      <div className="flex flex-col gap-8 w-3/5 mx-auto">
        <h1 className="text-gray-700 text-3xl mb-6 font-medium">
          2. Choose payment
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {clientSecret && (
            <>
              <section>
                <ExpressCheckoutElement
                  options={options}
                  onConfirm={onConfirm}
                />
                <section className="flex mt-8 mb-6 items-center w-full gap-2">
                  <hr className="grow h-px bg-gray-950"></hr>
                  <p className="text-lg text-gray-700">Or pay by card</p>
                  <hr className="grow h-px bg-gray-600"></hr>
                </section>
                <PaymentElement options={stripeOptions} />
              </section>
              <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-900 p-2 w-full rounded-md text-gray-100 text-lg">
                Pay €{amount}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
