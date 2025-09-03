import AddressSection from "@/app/components/review-and-pay/review-step/sections/AddressSection";
import PromoCodeSection from "@/app/components/review-and-pay/review-step/sections/PromoCodeSection";
import SummarySection from "@/app/components/review-and-pay/review-step/sections/SummarySection";
import Heading from "@/app/components/shared/Heading";
import StepBadge from "@/app/components/shared/StepBadge";

export default function ReviewOrderStep() {
  return (
    <section className="w-full">
      <StepBadge current={2} max={3} />
      <div className="mx-auto flex flex-col">
        <Heading label="Review order" as="h1" />
        <h2 className="mb-6 w-full text-gray-dark">
          Take a moment to ensure everything is correct.
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <PromoCodeSection />
        <AddressSection type="shipping" />
        <AddressSection type="billing" />
        <SummarySection />
      </div>
    </section>
  );
}
