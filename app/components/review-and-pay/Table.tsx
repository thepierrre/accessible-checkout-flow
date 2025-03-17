import Row from "@/app/components/review-and-pay/Row";

type Item = { name: string; amount: number; itemPrice: number };

export default function Table() {
  const items: Item[] = [
    { name: "Burtukaana, Ethiopia (natural)", amount: 1, itemPrice: 15.5 },
    { name: "Lake Kivu, Kongo (washed)", amount: 1, itemPrice: 13.9 },
    { name: "Rugali, Rwanda (natural)", amount: 1, itemPrice: 14.9 },
    { name: "Kerinci, Indonesia (honey)", amount: 1, itemPrice: 13.9 },
    { name: "Nansebo, Ethiopia (natural)", amount: 1, itemPrice: 14.9 },
  ];

  function calculateTotalPriceForItem(item: Item) {
    return item.amount * item.itemPrice;
  }

  const shippingCost = 2.99;

  function calculateTotalCost(): number {
    return items.reduce(function (accumulator, currentItem) {
      return accumulator + calculateTotalPriceForItem(currentItem);
    }, shippingCost);
  }

  return (
    <table className="w-full text-sm">
      <tbody className="w-full flex flex-col mt-2 mb-4 child-odd:bg-gray-50 child:rounded-lg child:py-2 child:px-4">
        {items.map((item) => (
          <Row
            key={item.name}
            name={item.name}
            price={calculateTotalPriceForItem(item)}
          />
        ))}
      </tbody>
      <tfoot className="flex flex-col pt-2 font-semibold child:px-2 child:py-1 border-t border-dotted">
        <Row name={"Shipping"} price={shippingCost} />
        <Row name={"Total"} price={calculateTotalCost()} />
      </tfoot>
    </table>
  );
}
