import Row from "@/app/components/review-and-pay/Row";

type Item = { name: string; amount: number; priceForUnit: number };

interface Props {
  discountApplied?: number;
}

export default function Table({ discountApplied }: Props) {
  const items: Item[] = [
    { name: "Burtukaana, Ethiopia (natural)", amount: 1, priceForUnit: 15.5 },
    { name: "Lake Kivu, Kongo (washed)", amount: 1, priceForUnit: 13.9 },
    { name: "Rugali, Rwanda (natural)", amount: 1, priceForUnit: 14.9 },
    { name: "Kerinci, Indonesia (honey)", amount: 1, priceForUnit: 13.9 },
    { name: "Nansebo, Ethiopia (natural)", amount: 1, priceForUnit: 14.9 },
  ];

  const shippingCost = 2.99;

  function getAllItemsPrice(): number {
    return items.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount * currentItem.priceForUnit;
    }, 0);
  }

  function getTotalPriceForItem(item: Item): number {
    return item.amount * item.priceForUnit;
  }

  function getSavedOnDiscount(discount?: number) {
    if (!discount) return 0;
    return getAllItemsPrice() * (discount / 100);
  }

  function getTotalPrice(discount?: number) {
    return getAllItemsPrice() - getSavedOnDiscount(discount) + shippingCost;
  }

  return (
    <table className="w-full text-sm">
      <tbody className="w-full flex flex-col mt-2 mb-4 child-odd:bg-gray-50 child:rounded-lg child:py-2 child:px-4">
        {items.map((item) => (
          <Row
            key={item.name}
            name={item.name}
            amount={getTotalPriceForItem(item)}
          />
        ))}
      </tbody>
      <tfoot className="flex flex-col pt-2 font-semibold child:px-4 child:py-1 border-t border-dotted">
        <Row name={"Subtotal"} amount={getAllItemsPrice()} />
        {discountApplied && (
          <Row
            name={"Discount"}
            amount={getSavedOnDiscount(discountApplied)}
            isDiscount
          />
        )}
        <Row name={"Shipping"} amount={shippingCost} />
        <Row name={"Total"} amount={getTotalPrice(discountApplied)} />
      </tfoot>
    </table>
  );
}
