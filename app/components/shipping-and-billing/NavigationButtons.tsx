import { useRouter } from "next/navigation";
import { CheckoutSteps } from "@/app/checkout/models";
import { clsx } from "clsx";
import { ibmPlexMono } from "@/app/layout";

interface Props {
  isSubmitting: boolean;
  currentStep: "cart" | "address" | "final";
  isEditing: boolean | "shipping" | "billing";
}

export default function NavigationButtons({
  isSubmitting,
  currentStep,
  isEditing,
}: Props) {
  const router = useRouter();

  function handlePreviousStepClick() {
    if (currentStep === "address") {
      router.push("/cart");
    }
  }

  function getNextStepText() {
    if (currentStep === "cart") return "Shipping & Billing";
    else if (currentStep === "address") {
      if (isEditing) return "Save Changes & Pay";
      else return "Review & Pay";
    }
  }

  return (
    <section className="flex place-content-between mt-6">
      {currentStep === "address" && (
        <button
          type="button"
          onClick={handlePreviousStepClick}
          className="bg-white border-2 border-blue-primary py-2 px-6 rounded-lg text-blue-semidark hover:bg-blue-light  focus:ring focus:ring-blue-primary"
        >
          Back to Cart
        </button>
      )}
      <button
        type="submit"
        className={clsx(
          "py-2 px-6 w-30 rounded-lg bg-blue-primary text-white  ",
          isSubmitting
            ? "bg-blue-light"
            : "hover:bg-blue-semidark focus:outline-solid focus:outline-offset-2",
        )}
        disabled={isSubmitting}
      >
        {getNextStepText()}
      </button>
    </section>
  );
}
