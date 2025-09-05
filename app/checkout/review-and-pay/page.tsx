import ReviewAndPayView from "@/app/components/review-and-pay/ReviewAndPayView";
import { icons } from "@/app/constants/icons";

export const metadata = {
  title: "Checkout | Review & Pay",
  icons,
};

export default function ReviewAndPayPage() {
  return <ReviewAndPayView />;
}
