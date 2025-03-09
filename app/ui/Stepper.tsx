import { clsx } from "clsx";

interface Props {
  activeLabel: string;
}

export default function Stepper({ activeLabel }: Props) {
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

  const checkSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      height="24"
      width="24"
    >
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  const currentStepIndex: number = steps.findIndex(
    (step) => step.label === activeLabel,
  );

  function isStepComplete(index: number): boolean {
    return index < currentStepIndex;
  }

  const isCurrentlyAtLastStep = currentStepIndex === 3;

  function progressCircleClass(index: number): string {
    if (isStepComplete(index) || isCurrentlyAtLastStep) {
      return "bg-green-500";
    } else if (index === currentStepIndex) {
      return "border-2 border-green-500 text-green-500";
    } else {
      return "border-2 border-gray-400 text-gray-400 font-medium";
    }
  }

  function progressBarStyle(index: number): string {
    if (isStepComplete(index) || index === currentStepIndex) {
      return "bg-green-500";
    } else {
      return "bg-gray-400";
    }
  }

  return (
    <nav className="border-b-black w-full">
      <ol className="flex justify-center gap-4 py-12">
        {steps.map((step, index) => (
          <li key={step.label}>
            <a href={step.href} className="flex flex-col gap-2">
              <div className={clsx("w-60 h-1", progressBarStyle(index))}></div>
              <div className="flex gap-4 items-center">
                <div
                  className={clsx(
                    "w-10 h-10 rounded-3xl flex items-center justify-center",
                    progressCircleClass(index),
                  )}
                >
                  {isStepComplete(index) || isCurrentlyAtLastStep
                    ? checkSvg
                    : `${index + 1}`}
                </div>
                <div>{step.label}</div>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
