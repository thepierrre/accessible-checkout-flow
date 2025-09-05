import type { RefObject } from "react";

interface Props {
  ref?: RefObject<HTMLElement | null>;
  errorMessage: string | null;
}

export default function ErrorContainer({ ref, errorMessage }: Props) {
  return (
    <section
      role="alert"
      aria-live="assertive"
      ref={ref}
      className="mb-4 flex items-center gap-4 rounded-lg border border-red-primary px-4 py-2 text-red-primary text-sm sm:text-md"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6 text-red-primary"
        role="img"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="12"
          y1="7"
          x2="12"
          y2="13"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="17" r="1.5" fill="currentColor" />
      </svg>
      <div>
        <p className="font-semibold antialiased">Error</p>
        <p>{errorMessage}</p>
      </div>
    </section>
  );
}
