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
      label: "Review & Payment",
      href: "payment",
      active: activeLabel === "Payment",
    },
    {
      label: "Order Complete",
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

  const isCurrentlyAtLastStep = currentStepIndex === 2;

  function progressCircleClass(index: number): string {
    if (isStepComplete(index) || isCurrentlyAtLastStep) {
      return "bg-gray-700";
    } else if (index === currentStepIndex) {
      return "border-2 border-gray-700 bg-gray-100 text-gray-700";
    } else {
      return "border-2 border-gray-700 text-gray-700 font-medium";
    }
  }

  function progressBarStyle(index: number): string {
    if (isStepComplete(index) || index === currentStepIndex) {
      return "border-solid";
    } else {
      return "border-dashed";
    }
  }

  return (
    <nav className="absolute w-full h-14 pt-4 pl-12">
      <ol className="flex">
        {steps.map((step, index) => (
          <li key={step.label}>
            <a href={step.href} className="flex flex-col gap-4">
              <div className="flex items-center">
                {index > 0 && (
                  <div
                    className={clsx(
                      "mx-4 w-52 border-2 border-gray-700",
                      progressBarStyle(index),
                    )}
                  ></div>
                )}
                <div className="flex flex-col">
                  <div
                    className={clsx(
                      "w-8 h-8 rounded-2xl flex items-center justify-center text-xl",
                      progressCircleClass(index),
                    )}
                  >
                    {isStepComplete(index) || isCurrentlyAtLastStep
                      ? checkSvg
                      : `${index + 1}`}
                  </div>
                  <div className="absolute top-14 text-md text-gray-700">
                    {step.label}
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
