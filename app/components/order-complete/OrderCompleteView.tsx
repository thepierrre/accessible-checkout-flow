"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ContactForm from "@/app/components/order-complete/ContactForm";
import OrderCompleteInfo from "@/app/components/order-complete/OrderCompleteInfo";
import PageShownOnceDisclaimer from "@/app/components/order-complete/PageShownOnceDisclaimer";
import ShopMoreButton from "@/app/components/order-complete/ShopMoreButton";
import { getAddressData } from "@/app/lib/addressDataUtils";
import ProcessingPayment from "@/app/components/order-complete/ProcessingPayment";

export default function OrderCompleteView() {
  const router = useRouter();
  const [canAccessPage, setCanAccessPage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [buyerEmail, setBuyerEmail] = useState<string>("");

  useEffect(() => {
    const { billing } = getAddressData();
    const lastOrder = JSON.parse(sessionStorage.getItem("lastOrder") || "{}");

    if (!lastOrder.intentId) {
      router.replace("/checkout/shipping-and-billing");
      return;
    }

    setBuyerEmail(billing.email);

    // Adds an artificial delay to simulate connecting to the provider
    const timer = setTimeout(() => {
      setCanAccessPage(true);
      setIsProcessing(false);
      sessionStorage.removeItem("lastOrder");
      sessionStorage.removeItem("addressFormData");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  if (isProcessing) return <ProcessingPayment />;

  if (!canAccessPage) return null;

  return (
    <main className="mx-auto mt-24 max-w-lg animate-fade-in-up space-y-8 px-10 py-8">
      <div className="space-y-4 text-center">
        <OrderCompleteInfo orderEmail={buyerEmail} />
        <ShopMoreButton />
        <PageShownOnceDisclaimer />
        <ContactForm orderEmail={buyerEmail} />
      </div>
    </main>
  );
}
