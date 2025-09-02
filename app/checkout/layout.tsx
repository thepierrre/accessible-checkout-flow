import { OrderSummaryProvider } from "@/app/context/OrderSummaryContext";
import type { ReactNode } from "react";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <OrderSummaryProvider>
      <div>
        <div>{children}</div>
      </div>
    </OrderSummaryProvider>
  );
}
