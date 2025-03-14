import Link from "next/link";
import { PartialAddressFormData, CheckoutSteps } from "@/app/checkout/models";

interface Props {
  previousStepName: CheckoutSteps;
  nextStepName?: CheckoutSteps;
  prevStepHref: string;
  nextStepHref?: string;
}

export default function NavigationButtons({
  previousStepName,
  nextStepName,
  nextStepHref,
}: Props) {
  return (
    <section className="flex place-content-between">
      <button type="button" className="bg-green-300 py-2 px-6 rounded-lg">
        {previousStepName === "Basket" ? "Back to Basket" : previousStepName}
      </button>
      {nextStepName && nextStepHref && (
        <button type="submit" className="bg-green-700 py-2 px-6 rounded-lg">
          {nextStepName}
        </button>
      )}
    </section>
  );
}
