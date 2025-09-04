"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Heading from "@/app/components/shared/Heading";
import StepBadge from "@/app/components/shared/StepBadge";
import { APPEARANCE } from "@/app/constants/stripe";
import { useOrderSummary } from "@/app/context/OrderSummaryContext";
import { convertToSubcurrency } from "@/app/lib/convertToSubcurrency";
import CardCheckout from "./CardCheckout";
import ExpressCheckout from "./ExpressCheckout";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(publishableKey);

export default function PaymentStep() {
  const { total } = useOrderSummary();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubcurrency(20.99) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="mb-6 animate-pulse font-bold text-2xl text-blue-primary uppercase tracking-wider">
          Preparing secure checkout
        </h2>
        <div className="h-2 w-72 animate-[loading_1.5s_infinite] rounded-full bg-gradient-to-r from-blue-semilight via-blue-primary to-blue-semidark" />
        <p className="mt-4 text-gray-600 text-sm">
          Hang on, we are connecting…
        </p>
        <style jsx>{`
                    @keyframes loading {
                        0% {
                            background-position: -200px 0;
                        }
                        100% {
                            background-position: calc(200px + 100%) 0;
                        }
                    }

                    div {
                        background-size: 200% 100%;
                    }
                `}</style>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: APPEARANCE,
  };

  return (
    <div>
      <StepBadge current={3} max={3} />
      <Heading
        label="Select payment"
        as="h1"
        subheading="Pay by express checkout or by card."
      />
      <Elements stripe={stripePromise} options={options}>
        <ExpressCheckout clientSecret={clientSecret} />
      </Elements>
      <Elements stripe={stripePromise} options={options}>
        <CardCheckout
          amount={Number(total.toFixed(2))}
          clientSecret={clientSecret}
        />
      </Elements>
    </div>
  );
}
