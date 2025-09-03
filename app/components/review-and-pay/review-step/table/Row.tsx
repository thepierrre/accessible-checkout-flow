import { clsx } from "clsx";
import { memo } from "react";

interface Props {
  name: string;
  amount: number;
  isDiscount?: true;
  body?: boolean;
}

function Row({ name, amount, isDiscount, body = false }: Props) {
  const Cell = body ? "td" : "th";

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(amount);

  return (
    <tr
      className={clsx(
        body && "odd:bg-gray-100",
        isDiscount && "text-emerald-500",
      )}
    >
      <Cell
        scope={body ? undefined : "row"}
        className="rounded-l-lg px-4 py-2 text-left"
      >
        {name}
      </Cell>
      <td
        className="rounded-r-lg px-4 py-2 text-right"
        aria-label={isDiscount ? `Minus ${formattedAmount}` : undefined}
      >
        <span>{isDiscount ? "–" : ""}</span>
        <span>{formattedAmount}</span>
      </td>
    </tr>
  );
}

export default memo(Row);
