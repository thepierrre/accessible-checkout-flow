"use client";

import {
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

interface Props {
  clientSecret: string;
}

export default function ExpressCheckout({ clientSecret }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  if (!clientSecret || !stripe || !elements) {
    return <div>Loading...</div>;
  }

  const handleExpressCheckout = async () => {
    const intentId = clientSecret?.split("_secret")[0];

    if (intentId) {
      sessionStorage.setItem("lastOrder", JSON.stringify({ intentId }));
    }

    const { error } = await stripe.confirmPayment({
      // `Elements` instance that's used to create the Express Checkout Element.
      elements,
      // `clientSecret` from the created PaymentIntent
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/order-complete?session_id={CHECKOUT_SESSION_ID}`,
      },
      // Uncomment below if you only want redirect for redirect-based payments.
      // redirect: 'if_required',
    });

    if (error) {
      console.error(error);
      // This point is reached only if there's an immediate error when confirming the review-step-and-pay.
      // Show the error to your customer (for example, review-step-and-pay details incomplete).
    } else {
      // Your customer will be redirected to your `return_url`.
    }
  };

  return (
    <section className="flex child:w-full child:mb-3 w-full">
      {clientSecret && (
        <ExpressCheckoutElement onConfirm={handleExpressCheckout} />
      )}
    </section>
  );
}
