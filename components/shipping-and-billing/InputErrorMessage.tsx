import { clsx } from "clsx";

interface Props {
  message?: string;
}

export default function InputErrorMessage({ message = "" }: Props) {
  return (
    <p
      className={clsx(
        "overflow-hidden text-red-primary text-sm transition-[max-height] duration-700",
        message ? "max-h-8" : "max-h-0",
      )}
    >
      {message || ""}
    </p>
  );
}
