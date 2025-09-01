import Image from "next/image";
import type { RefObject } from "react";
import warningIcon from "@/public/icons/warningIcon.svg";

interface Props {
  ref: RefObject<HTMLElement | null>;
  errorMessage: string;
}

export default function ErrorContainer({ ref, errorMessage }: Props) {
  return (
    <section
      ref={ref}
      className="mb-4 flex gap-4 rounded-lg border border-red-primary px-4 py-2 text-red-primary"
    >
      <Image src={warningIcon} alt="Error warning icon" />
      <div>
        <p className="font-semibold antialiased">Error</p>
        <p>{errorMessage}</p>
      </div>
    </section>
  );
}
