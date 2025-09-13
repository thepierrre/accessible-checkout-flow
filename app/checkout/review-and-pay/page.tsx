import ReviewAndPayView from "@/components/review-and-pay/ReviewAndPayView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Review & Pay",
  description: "Review your order and pay.",
};

export default function ReviewAndPayPage() {
  return <ReviewAndPayView />;
}
