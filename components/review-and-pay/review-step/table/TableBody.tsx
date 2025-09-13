import Row from "@/components/review-and-pay/review-step/table/Row";
import type { Product } from "@/types/orderSummary";

interface Props {
  products: Product[];
}

export default function TableBody({ products }: Props) {
  function getTotalPriceForItem(item: Product): number {
    return item.amount * item.price;
  }

  return (
    <tbody>
      <tr>
        <th colSpan={2} scope="rowgroup" className="sr-only">
          Products
        </th>
      </tr>
      {products.map((item) => (
        <Row
          key={item.name}
          name={item.name}
          amount={getTotalPriceForItem(item)}
          body={true}
        />
      ))}
    </tbody>
  );
}
