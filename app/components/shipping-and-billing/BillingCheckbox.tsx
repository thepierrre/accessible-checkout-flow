import { type ComponentPropsWithRef, useId } from "react";

type Props = ComponentPropsWithRef<"input">;

export default function BillingCheckbox(props: Props) {
  const checkboxId = useId();

  return (
    <section className="relative my-6 flex items-center gap-2">
      <div className="relative flex items-center">
        <input
          {...props}
          id={checkboxId}
          type="checkbox"
          className="peer h-8 w-8 appearance-none rounded-md border-2 border-blue-primary bg-white checked:border-0 checked:bg-blue-primary sm:h-6 sm:w-6 focus-primary"
        />
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto hidden h-5 w-5 sm:h-5 sm:w-5 peer-checked:block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <label htmlFor={checkboxId} className="font-medium text-xl">
        Use for billing
      </label>
    </section>
  );
}
