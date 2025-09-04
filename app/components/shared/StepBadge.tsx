import { clsx } from "clsx";

interface Props {
  current: number;
  max: number;
}

export default function StepBadge({ current, max }: Props) {
  return (
    <div className={clsx("mb-6", current === 3 && "mt-6")}>
      <p className="sr-only">
        Step {current} of {max}
      </p>
      <span
        aria-hidden="true"
        className="rounded-full bg-blue-extralight px-4 py-2 text-blue-primary text-sm tracking-wide text-md"
      >
        Step {current} of {max}
      </span>
    </div>
  );
}
