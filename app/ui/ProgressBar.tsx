interface Props {
  activeLabel: string;
}

export default function ProgressBar({ activeLabel }: Props) {
  const steps = [
    {
      label: "Shipping & Billing",
      active: activeLabel === "Shipping & Billing",
    },
    {
      label: "Review Order",
      active: activeLabel === "Review Order",
    },
    {
      label: "Payment",
      active: activeLabel === "Payment",
    },
    {
      label: "Complete",
      active: activeLabel === "Complete",
    },
  ];
  return (
    <ol className="flex justify-center gap-12">
      {steps.map((step) => (
        <li key={step.label}>{step.label}</li>
      ))}
    </ol>
  );
}
