import { useRouter } from "next/navigation";
import { CheckoutSteps } from "@/app/checkout/models";
import { clsx } from "clsx";
import { ibmPlexMono } from "@/app/layout";

interface Props {
  isSubmitting: boolean;
  previousStepName: CheckoutSteps;
  nextStepName?: CheckoutSteps;
  prevStepHref: string;
  nextStepHref?: string;
}

export default function NavigationButtons({
  isSubmitting,
  previousStepName,
  nextStepName,
  nextStepHref,
}: Props) {
  const router = useRouter();

  function handlePreviousStepClick() {
    if (previousStepName === "Cart") {
      router.push("/cart");
    }
  }

  return (
    <section className="flex place-content-between mt-6">
      <button
        type="button"
        onClick={handlePreviousStepClick}
        className="bg-white border-2 border-blue-primary py-2 px-6 rounded-lg text-blue-semidark hover:bg-blue-semilight hover:text-white focus:outline-solid focus:outline-offset-2"
      >
        {previousStepName === "Cart" ? "Return to Cart" : previousStepName}
      </button>
      {nextStepName && nextStepHref && (
        <button
          type="submit"
          className="py-2 px-6 w-30 rounded-lg bg-blue-primary text-white  hover:bg-blue-semidark focus:outline-solid focus:outline-offset-2"
        >
          {nextStepName === "Review Order" ? "Review & Pay" : nextStepName}
        </button>
      )}
    </section>
  );
}
