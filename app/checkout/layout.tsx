import type { ReactNode } from "react";
import { AddressProvider } from "@/app/context/AddressContext";
import { AppMessageProvider } from "@/app/context/AppMessageContext";
import { OrderSummaryProvider } from "@/app/context/OrderSummaryContext";

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
