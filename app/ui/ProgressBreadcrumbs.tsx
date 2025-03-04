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
      label: "Complete",
      href: "complete",
      active: activeLabel === "Complete",
    },
  ];
  return (
    <nav className="h-16 border border-b-black">
      <ol className="flex justify-center gap-12">
        {steps.map((step) => (
          <li key={step.label}>
            <a href={step.href}>{step.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
