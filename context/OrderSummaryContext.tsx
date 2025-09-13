"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";
import { DEFAULT_SUMMARY } from "@/constants/defaultOrderSummary";
import type { OrderSummary } from "@/app/types/orderSummary";

type OrderSummaryContextType = {
  orderSummary: OrderSummary;
  setOrderSummary: Dispatch<SetStateAction<OrderSummary>>;
  setDiscount: (discount: number) => void;
  discount: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  total: number;
  setTotal: (total: number) => void;
};

export const OrderSummaryContext = createContext<
  OrderSummaryContextType | undefined
>(undefined);

export function useOrderSummary() {
  const context = useContext(OrderSummaryContext);
  if (!context) {
    throw new Error(
      "useOrderSummary was used outside the OrderSummaryProvider.",
    );
  }
  return context;
}

export function OrderSummaryProvider({ children }: { children: ReactNode }) {
  const [orderSummary, setOrderSummary] =
    useState<OrderSummary>(DEFAULT_SUMMARY);
  const [promoCode, setPromoCode] = useState("");
  const [total, setTotal] = useState(0);

  const setDiscount = (discount: number) => {
    setOrderSummary((prev) => ({ ...prev, discount }));
  };

  const discount = orderSummary?.discount;

  return (
    <OrderSummaryContext.Provider
      value={{
        orderSummary,
        setOrderSummary,
        setDiscount,
        discount,
        promoCode,
        setPromoCode,
        total,
        setTotal,
      }}
    >
      {children}
    </OrderSummaryContext.Provider>
  );
}
