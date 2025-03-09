import ProgressBreadcrumbs from "@/app/ui/ProgressBreadcrumbs";

export default function ReviewOrderPage() {
  return (
    <div className="flex flex-col items-center">
      <ProgressBreadcrumbs activeLabel="Review Order" />
      <main className="flex flex-col gap-8 w-112"></main>
    </div>
  );
}
