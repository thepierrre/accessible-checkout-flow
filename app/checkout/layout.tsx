import type { ReactNode } from "react";
import { AddressProvider } from "@/app/context/AddressContext";
import { OrderSummaryProvider } from "@/app/context/OrderSummaryContext";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <AddressProvider>
      <OrderSummaryProvider>
        <div>
          <div>{children}</div>
        </div>
      </OrderSummaryProvider>
    </AddressProvider>
  );
}
