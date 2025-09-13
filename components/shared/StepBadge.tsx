import { clsx } from "clsx";

interface Props {
  current: number;
  max: number;
}

export default function StepBadge({ current, max }: Props) {
  return (
    <div
      className={clsx(
        "mb-6 inline-block rounded-full bg-blue-extralight px-4 py-2 text-blue-primary text-md text-sm tracking-wide",
        current === 3 && "mt-6",
      )}
    >
      Step {current} of {max}
    </div>
  );
}
