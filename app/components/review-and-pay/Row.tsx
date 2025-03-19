import { clsx } from "clsx";

interface Props {
  name: string;
  amount: number;
  isDiscount?: true;
}

export default function Row({ name, amount, isDiscount }: Props) {
  return (
    <tr
      className={clsx(
        "flex w-full rounded-lg",
        isDiscount && "text-emerald-500",
      )}
    >
      <td className="grow">{name}</td>
      <td className="flex gap-1">
        <span>{isDiscount ? "–" : ""}</span>
        <span>€{amount.toFixed(2)}</span>
      </td>
    </tr>
  );
}
