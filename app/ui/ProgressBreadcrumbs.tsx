interface Props {
  activeLabel: string;
}

export default function ProgressBreadcrumbs({ activeLabel }: Props) {
  const steps = [
    {
      label: "Shipping & Billing",
      href: "shipping-and-billing",
      active: activeLabel === "Shipping & Billing",
    },
    {
      label: "Review Order",
      href: "review-order",
      active: activeLabel === "Review Order",
    },
    {
      label: "Payment",
      href: "payment",
      active: activeLabel === "Payment",
    },
    {
      label: "Order complete",
      href: "order-complete",
      active: activeLabel === "Order complete",
    },
  ];

  const activeLabelIndex = steps.findIndex(
    (step) => step.label === activeLabel,
  );

  return (
    <nav className="border-b-black w-full">
      <ol className="flex justify-center gap-4 py-12">
        {steps.map((step, index) => (
          <li key={step.label} className="flex flex-col gap-2">
            <div className="w-60 h-1 bg-black"></div>
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-black rounded-3xl text-white flex items-center justify-center">
                {activeLabelIndex > index ? "V" : `${index + 1}`}
              </div>
              <div>{step.label}</div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
