import Stepper from "@/app/ui/Stepper";

export default function ReviewOrderPage() {
  return (
    <div className="flex flex-col items-center">
      <Stepper activeLabel="Review Order" />
      <main className="flex flex-col gap-8 w-112">
        <NavigationButtons
          previousStepName="Shipping & Billing"
          nextStepName="Payment"
          prevStepHref="shipping-and-billing"
          nextStepHref="payment"
        />
      </main>
    </div>
  );
}
