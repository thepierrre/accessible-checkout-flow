import type { ReactNode } from "react";
import { AddressProvider } from "@/context/AddressContext";
import { AppMessageProvider } from "@/context/AppMessageContext";
import { OrderSummaryProvider } from "@/context/OrderSummaryContext";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <AppMessageProvider>
      <AddressProvider>
        <OrderSummaryProvider>
          <div>{children}</div>
        </OrderSummaryProvider>
      </AddressProvider>
    </AppMessageProvider>
  );
}
