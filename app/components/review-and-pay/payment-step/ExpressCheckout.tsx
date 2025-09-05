"use client";

import {
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useOnlineStatus } from "@/app/hooks/useOnlineStatus";
import { useAppMessage } from "@/app/context/AppMessageContext";
import { useRouter } from "next/navigation";

interface Props {
  clientSecret: string;
}

export default function ExpressCheckout({ clientSecret }: Props) {
  const { isOnline, notifyOffline } = useOnlineStatus();
  const router = useRouter();
  const { setAppMessage, clearAppMessage } = useAppMessage();
  const stripe = useStripe();
  const elements = useElements();

  if (!clientSecret || !stripe || !elements) {
    return <div>Loading...</div>;
  }

  const handleExpressCheckout = async () => {
    if (!isOnline) {
      notifyOffline();
      return;
    }

    clearAppMessage();

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
      setAppMessage(error.message ?? "Payment error. Please try again.");
      router.push("/checkout/review-and-pay");
      console.error(error);
    }
  };

  return (
    <section className="child:mb-3 flex child:w-full w-full">
      {clientSecret && (
        <ExpressCheckoutElement onConfirm={handleExpressCheckout} />
      )}
    </section>
  );
}
