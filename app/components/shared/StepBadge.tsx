interface Props {
  current: number;
  max: number;
}

export default function StepBadge({ current, max }: Props) {
  return (
    <div className="my-6">
      <p className="sr-only">
        Step {current} of {max}
      </p>
      <span
        aria-hidden="true"
        className="rounded-full bg-blue-extralight px-2 py-0.5 text-blue-primary text-sm tracking-wide"
      >
        Step {current} of {max}
      </span>
    </div>
  );
}
