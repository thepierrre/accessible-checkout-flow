"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PaymentStep from "@/app/components/review-and-pay/payment-step/PaymentStep";
import ReviewOrderStep from "@/app/components/review-and-pay/review-step/ReviewOrderStep";

export default function PaymentPage() {
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
    <main className="animate-fade-in-up my-10 mx-auto w-full px-6 sm:w-160 sm:rounded-xl sm:bg-gradient-to-br sm:from-gray-extralight sm:to-gray-light sm:p-10 sm:shadow-md ">
      <ReviewOrderStep />
      <div className="my-6">
        <span className="block w-full border-t border-gray-300" />
      </div>
      <PaymentStep />
    </main>
  );
}
