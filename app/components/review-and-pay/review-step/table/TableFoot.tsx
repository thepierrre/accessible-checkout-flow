import Row from "@/app/components/review-and-pay/review-step/table/Row";
import type { Product } from "@/app/types/orderSummary";
import { useOrderSummary } from "@/app/context/OrderSummaryContext";
import { useEffect } from "react";

interface Props {
  products: Product[];
  discount: number;
  shipping: number;
}

export default function TableFoot({ products, discount, shipping }: Props) {
  const { setTotal } = useOrderSummary();

  const allItemsPrice = products.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount * currentItem.price;
  }, 0);

  const savedOnDiscount = allItemsPrice * (discount / 100);
  const totalPrice = allItemsPrice - savedOnDiscount + shipping;

  useEffect(() => {
    setTotal(totalPrice);
  }, [totalPrice, setTotal]);

  return (
    <tfoot className="border-t border-dotted child:px-4 child:py-1 font-semibold">
      <tr>
        <th colSpan={2} scope="rowgroup" className="sr-only">
          Summary
        </th>
      </tr>
      <Row name={"Subtotal"} amount={allItemsPrice} />
      {discount !== 0 && (
        <Row name={"Discount"} amount={savedOnDiscount} isDiscount />
      )}
      <Row name={"Shipping"} amount={shipping} />
      <Row name={"Total"} amount={totalPrice} />
    </tfoot>
  );
}
