import Stepper from "@/app/ui/Stepper";

export default function PaymentPage() {
  return (
    <div className="flex flex-col items-center">
      <Stepper activeLabel="Payment" />
      <main className="flex flex-col gap-8 w-112">
        <NavigationButtons
          previousStepName="Review Order"
          nextStepName="Order complete"
          prevStepHref="review-order"
        />
      </main>
    </div>
  );
}
