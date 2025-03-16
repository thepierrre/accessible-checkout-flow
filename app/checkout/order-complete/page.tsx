import Stepper from "@/app/components/Stepper";

export default function OrderCompletePage() {
  return (
    <div className="flex flex-col items-center">
      <Stepper activeLabel="Order Complete" />
      <main className="flex flex-col gap-8 w-112">
        <h1 className="uppercase">Thanks for your order!</h1>
      </main>
    </div>
  );
}
