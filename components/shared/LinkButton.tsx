import { MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

interface LinkButtonProps {
  size?: "small" | "regular";
  variant?: "primary" | "secondary" | "soft";
  label: string;
  children?: ReactNode;
  disabled?: boolean; // could disable styling, but Link can’t really be disabled
  barButton?: boolean;
  ariaLabel?: string;
  icon?: { img: ImageProps; position: "left" | "right" };
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function LinkButton({
  size = "regular",
  variant = "primary",
  label,
  children,
  disabled = false,
  barButton = false,
  ariaLabel,
  icon,
  href,
  onClick,
}: LinkButtonProps) {
  const classes = clsx(
    "px-2 text-sm",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    size === "small" ? "px-2 py-1 text-sm" : "px-3 text-base",
    variant === "primary" &&
      "bg-blue-primary text-white hover:bg-blue-semidark",
    variant === "secondary" &&
      "border-2 border-blue-primary bg-white text-blue-semidark hover:bg-blue-light",
    variant === "soft" &&
      "focus-primary-rounded flex h-8 rounded-full bg-blue-extralight text-blue-primary hover:bg-blue-light",
    barButton && "w-full",
    "inline-flex items-center gap-1 font-medium transition-colors duration-200",
  );

  const Img = icon ? <Image {...icon.img} className="h-5 w-5" /> : null;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {icon?.position === "left" && Img}
      {children}
      {label}
      {icon?.position === "right" && Img}
    </Link>
  );
}
