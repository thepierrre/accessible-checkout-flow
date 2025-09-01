import { type ComponentPropsWithRef, useId } from "react";

type Props = ComponentPropsWithRef<"input">;

export default function BillingCheckbox(props: Props) {
  const checkboxId = useId();
  return (
    <section className="relative my-6 flex gap-2">
      <input
        {...props}
        id={checkboxId}
        type="checkbox"
        className="peer relative h-6 w-6 shrink-0 appearance-none self-center rounded-md border-2 border-blue-primary bg-white checked:border-0 checked:bg-blue-primary focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-1"
      />
      <label htmlFor={checkboxId} className="font-medium text-lg">
        Use for billing
      </label>
      <svg
        className="pointer-events-none absolute mt-1.5 ml-1 hidden h-4 w-4 peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </section>
  );
}
