"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PaymentStep from "@/components/review-and-pay/payment-step/PaymentStep";
import ReviewOrderStep from "@/components/review-and-pay/review-step/ReviewOrderStep";
import ErrorComponent from "@/components/shipping-and-billing/ErrorComponent";
import { useAppMessage } from "@/context/AppMessageContext";

export default function ReviewAndPayView() {
  const { appMessage } = useAppMessage();
  const router = useRouter();
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    const addressFormData = sessionStorage.getItem("addressFormData");

    if (!addressFormData) {
      router.replace("/checkout/shipping-and-billing");
      return;
    }

    setCanAccess(true);
  }, [router]);

  if (!canAccess) return null;

  return (
    <main className="mx-auto my-10 w-full animate-fade-in-up px-6 sm:w-160 sm:rounded-xl sm:bg-gradient-to-br sm:from-gray-extralight sm:to-gray-light sm:p-10 sm:shadow-md">
      {appMessage && <ErrorComponent errorMessage={appMessage} />}
      <ReviewOrderStep />
      <div className="my-6">
        <span className="block w-full border-gray-300 border-t" />
      </div>
      <PaymentStep />
    </main>
  );
}
