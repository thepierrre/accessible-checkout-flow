import Image from "next/image";
import warningIcon from "@/public/warning-icon.svg";
import { RefObject } from "react";

interface Props {
  ref: RefObject<HTMLElement | null>;
  errorMessage: string;
}

export default function ErrorContainer({ ref, errorMessage }: Props) {
  return (
    <section
      ref={ref}
      className="flex gap-4 text-red-primary border border-red-primary py-2 px-4 rounded-lg mb-4 "
    >
      <Image src={warningIcon} alt="Error warning icon" />
      <div>
        <p className="font-semibold antialiased">Error</p>
        <p>{errorMessage}</p>
      </div>
    </section>
  );
}
