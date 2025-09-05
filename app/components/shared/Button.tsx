import type { ReactNode } from "react";
import { clsx } from "clsx";
import Image, { type ImageProps } from "next/image";

const classes = {
  soft: "h-8 flex px-4 cursor-pointer items-center gap-1 bg-blue-extralight font-medium rounded-3xl text-blue-primary transition-colors duration-200 hover:bg-blue-light text-sm",
  primary:
    "bg-blue-primary text-white hover:bg-blue-semidark hover:bg-green-dark focus:outline-solid focus:outline-offset-2 px-6 rounded-xl",
  secondary:
    "border-2 border-blue-primary bg-white px-4 py-1 text-blue-semidark hover:bg-blue-light focus:ring focus:ring-blue-primary rounded-xl",
  small: "py-0 text-sm",
  regular: "py-2 text-lg",
};

interface IconProps {
  src: ImageProps["src"];
  alt: string;
  className?: string;
}

interface Props {
  size?: "small" | "regular";
  type?: "reset" | "submit" | "button";
  variant?: "primary" | "secondary" | "soft";
  label: string;
  children?: ReactNode;
  disabled?: boolean;
  barButton?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaPressed?: boolean;
  isLoading?: boolean;
  icon?: { img: IconProps; position: "left" | "right" };
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
  isLoading = false,
  icon,
}: Props) {
  const Img = icon ? (
    <Image
      src={icon.img.src}
      alt={icon.img.alt}
      className={clsx("h-5 w-5", icon.img.className)}
    />
  ) : null;

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
        size === "small" ? classes.small : classes.regular,
        variant === "primary" && classes.primary,
        variant === "secondary" && classes.secondary,
        variant === "soft" && classes.soft,
        barButton && "w-full",
        "inline-flex items-center justify-center gap-2",
        disabled || isLoading
          ? "cursor-not-allowed bg-blue-semilight hover:bg-blue-semilight"
          : "cursor-pointer",
      )}
    >
      {icon?.position === "left" && Img}
      {children}
      {label}
      {icon?.position === "right" && Img}

      {isLoading && (
        <svg
          className="h-5 w-5 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
    </button>
  );
}
