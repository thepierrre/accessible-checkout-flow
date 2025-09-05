import OrderCompleteView from "@/app/components/order-complete/OrderCompleteView";
import { icons } from "@/app/constants/icons";

export const metadata = {
  title: "Checkout | Order Complete",
  icons,
};

export default function OrderCompletePage() {
  return <OrderCompleteView />;
}
