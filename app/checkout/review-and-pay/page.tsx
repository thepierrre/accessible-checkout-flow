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
    <main className="mx-auto my-4 w-160 rounded-xl bg-gradient-to-br from-white to-gray-50 p-10 shadow-md">
      <ReviewOrderStep />
      <PaymentStep />
    </main>
  );
}
