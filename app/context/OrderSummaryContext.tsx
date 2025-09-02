"use client";

import {
  useContext,
  createContext,
  type ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export type Product = { name: string; price: number; amount: number };

type OrderSummary = {
  products: Product[];
  shipping: number;
};

type OrderSummaryContextType = {
  orderSummary: OrderSummary;
  setOrderSummary: Dispatch<SetStateAction<OrderSummary>>;
};

const defaultSummary = {
  products: [
    { name: "Burtukaana, Ethiopia (natural)", price: 15.5, amount: 1 },
    { name: "Lake Kivu, Kongo (washed)", price: 13.9, amount: 1 },
    { name: "Rugali, Rwanda (natural)", price: 14.9, amount: 1 },
    { name: "Kerinci, Indonesia (honey)", price: 13.9, amount: 1 },
    { name: "Nansebo, Ethiopia (natural)", price: 14.5, amount: 1 },
  ],
  shipping: 2.99,
};

export const OrderSummaryContext = createContext<
  OrderSummaryContextType | undefined
>(undefined);

export function useOrderSummary(): [
  OrderSummary,
  Dispatch<SetStateAction<OrderSummary>>,
] {
  const ctx = useContext(OrderSummaryContext);
  if (!ctx) {
    throw new Error(
      "useOrderSummary was used outside the OrderSummaryProvider.",
    );
  }
  return [ctx?.orderSummary, ctx?.setOrderSummary];
}

export function OrderSummaryProvider({ children }: { children: ReactNode }) {
  const [orderSummary, setOrderSummary] =
    useState<OrderSummary>(defaultSummary);

  return (
    <OrderSummaryContext.Provider value={{ orderSummary, setOrderSummary }}>
      {children}
    </OrderSummaryContext.Provider>
  );
}
