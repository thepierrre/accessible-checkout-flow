"use client";

import Row from "@/app/components/review-and-pay/Row";
import { Product, useOrderSummary } from "@/app/context/OrderSummaryContext";

interface Props {
  discountApplied?: number;
}

export default function Table({ discountApplied }: Props) {
  const [orderSummary, setOrderSummary] = useOrderSummary();

  const { products, shipping } = orderSummary;

  function getAllItemsPrice(): number {
    return products.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount * currentItem.price;
    }, 0);
  }

  function getTotalPriceForItem(item: Product): number {
    return item.amount * item.price;
  }

  function getSavedOnDiscount(discount?: number) {
    if (!discount) return 0;
    return getAllItemsPrice() * (discount / 100);
  }

  function getTotalPrice(discount?: number) {
    return getAllItemsPrice() - getSavedOnDiscount(discount) + shipping;
  }

  return (
    <table className="w-full text-sm">
      <tbody className="mt-2 mb-4 flex w-full flex-col child:rounded-lg child-odd:bg-gray-100 child:px-4 child:py-2">
        {products.map((item) => (
          <Row
            key={item.name}
            name={item.name}
            amount={getTotalPriceForItem(item)}
          />
        ))}
      </tbody>
      <tfoot className="flex flex-col border-t border-dotted child:px-4 child:py-1 pt-2 font-semibold">
        <Row name={"Subtotal"} amount={getAllItemsPrice()} />
        {discountApplied && (
          <Row
            name={"Discount"}
            amount={getSavedOnDiscount(discountApplied)}
            isDiscount
          />
        )}
        <Row name={"Shipping"} amount={shipping} />
        <Row name={"Total"} amount={getTotalPrice(discountApplied)} />
      </tfoot>
    </table>
  );
}
