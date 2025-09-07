import OrderCompleteView from "@/app/components/order-complete/OrderCompleteView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Order Complete",
  description:
    "Thank you for your order. Your purchase has been completed successfully.",
};

export default function OrderCompletePage() {
  return <OrderCompleteView />;
}
