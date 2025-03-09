import Stepper from "@/app/ui/Stepper";

export default function OrderCompletePage() {
  return (
    <div className="flex flex-col items-center">
      <ProgressBreadcrumbs activeLabel="Order complete" />
      <main className="flex flex-col gap-8 w-112"></main>
    </div>
  );
}
