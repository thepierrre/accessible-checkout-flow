import type { ReactNode } from "react";
import { clsx } from "clsx";

const classes = {
  primary:
    "bg-blue-primary text-white hover:bg-blue-semidark hover:bg-green-dark focus:outline-solid focus:outline-offset-2",
  secondary:
    "border-2 border-blue-primary bg-white px-4 py-1 text-blue-semidark hover:bg-blue-light focus:ring focus:ring-blue-primary",
  small: "py-1",
  regular: "py-2",
};

interface Props {
  size?: "small" | "regular";
  type?: "reset" | "submit" | "button";
  variant?: "primary" | "secondary";
  label: string;
  children?: ReactNode;
  disabled?: boolean;
  barButton?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaPressed?: boolean;
}

export default function Button({
  size = "regular",
  type = "button",
  variant = "primary",
  children,
  label,
  disabled = false,
  onClick,
  ariaLabel,
  ariaControls,
  ariaExpanded = false,
  ariaPressed = false,
  barButton = false,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
      onClick={onClick}
      className={clsx(
        "rounded-lg px-4",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        size === "small" ? classes.small : classes.regular,
        variant === "primary" ? classes.primary : classes.secondary,
        barButton && "w-full",
      )}
    >
      {children}
      {label}
    </button>
  );
}
