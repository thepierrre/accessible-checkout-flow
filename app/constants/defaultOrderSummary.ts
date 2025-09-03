import type { OrderSummary } from "@/app/types/orderSummary";

export const DEFAULT_SUMMARY: OrderSummary = {
  products: [
    { name: "Burtukaana, Ethiopia (natural)", price: 15.5, amount: 1 },
    { name: "Lake Kivu, Kongo (washed)", price: 13.9, amount: 1 },
    { name: "Rugali, Rwanda (natural)", price: 14.9, amount: 1 },
    { name: "Kerinci, Indonesia (honey)", price: 13.9, amount: 1 },
    { name: "Nansebo, Ethiopia (natural)", price: 14.5, amount: 1 },
  ],
  shipping: 2.99,
  discount: 0,
};
