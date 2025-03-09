import Link from "next/link";
import { CheckoutSteps } from "@/app/checkout/models";

interface Props {
  previousStepName: CheckoutSteps;
  nextStepName?: CheckoutSteps;
  prevStepHref: string;
  nextStepHref?: string;
}

export default function NavigationButtons({
  previousStepName,
  nextStepName,
  prevStepHref,
  nextStepHref,
}: Props) {
  return (
    <section className="flex place-content-between">
      <Link href={prevStepHref} className="bg-green-300 py-2 px-6 rounded-lg">
        {previousStepName === "Basket" ? "Back to Basket" : previousStepName}
      </Link>
      {nextStepName && nextStepHref && (
        <Link href={nextStepHref} className="bg-green-700 py-2 px-6 rounded-lg">
          {nextStepName}
        </Link>
      )}
    </section>
  );
}
