import type { ReactNode } from "react";
import { AddressProvider } from "@/app/context/AddressContext";
import { OrderSummaryProvider } from "@/app/context/OrderSummaryContext";
import { AppMessageProvider } from "@/app/context/AppMessageContext";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <AppMessageProvider>
      <AddressProvider>
        <OrderSummaryProvider>
          <div>
            <div>{children}</div>
          </div>
        </OrderSummaryProvider>
      </AddressProvider>
    </AppMessageProvider>
  );
}
