"use client";

import TableBody from "@/components/review-and-pay/review-step/table/TableBody";
import TableFoot from "@/components/review-and-pay/review-step/table/TableFoot";
import { useOrderSummary } from "@/context/OrderSummaryContext";

interface Props {
  caption: string;
}

export default function Table({ caption }: Props) {
  const { discount, orderSummary } = useOrderSummary();

  const { products, shipping } = orderSummary;

  return (
    <table className="w-full text-sm">
      <caption className="sr-only">{caption}</caption>
      <TableBody products={products} />
      <TableFoot products={products} discount={discount} shipping={shipping} />
    </table>
  );
}
