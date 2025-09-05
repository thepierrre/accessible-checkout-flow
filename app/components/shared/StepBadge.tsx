import { clsx } from "clsx";

interface Props {
  current: number;
  max: number;
}

export default function StepBadge({ current, max }: Props) {
  return (
    <div className={clsx("mb-6", current === 3 && "mt-6")}>
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-valuetext={`Step ${current} of ${max}`}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className="rounded-full bg-blue-extralight px-4 py-2 text-blue-primary text-md text-sm tracking-wide"
      >
        Step {current} of {max}
      </span>
    </div>
  );
}
