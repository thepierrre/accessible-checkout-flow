import AddressSection from "@/components/review-and-pay/review-step/sections/AddressSection";
import PromoCodeSection from "@/components/review-and-pay/review-step/sections/PromoCodeSection";
import SummarySection from "@/components/review-and-pay/review-step/sections/SummarySection";
import Heading from "@/components/shared/Heading";
import StepBadge from "@/components/shared/StepBadge";

export default function ReviewOrderStep() {
  return (
    <section className="w-full">
      <StepBadge current={2} max={3} />
      <div className="mx-auto flex flex-col">
        <Heading
          label="Review order"
          as="h1"
          subheading="Take a moment to ensure everything is correct."
        />
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
