interface Props {
  name: string;
  price: number;
}

export default function Row({ name, price }: Props) {
  return (
    <tr className="flex w-full rounded-lg">
      <td className="grow">{name}</td>
      <td>€{price.toFixed(2)}</td>
    </tr>
  );
}
