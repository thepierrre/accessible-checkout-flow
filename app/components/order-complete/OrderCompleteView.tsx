"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ContactForm from "@/app/components/order-complete/ContactForm";
import OrderConfirmation from "@/app/components/order-complete/OrderConfirmation";
import PageShownOnceDisclaimer from "@/app/components/order-complete/PageShownOnceDisclaimer";
import ProcessingPayment from "@/app/components/order-complete/ProcessingPayment";
import ShopMoreButton from "@/app/components/order-complete/ShopMoreButton";
import { getAddressData } from "@/app/lib/addressDataUtils";

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

    // Adds an artificial delay to simulate connecting to the provider (for demo purposes)
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
    <main className="mx-auto mt-24 max-w-lg animate-fade-in-up space-y-4 px-10 py-8 text-center">
      <OrderConfirmation orderEmail={buyerEmail} />
      <ShopMoreButton />
      <PageShownOnceDisclaimer />
      <ContactForm orderEmail={buyerEmail} />
    </main>
  );
}
