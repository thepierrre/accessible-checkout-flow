import { clsx } from "clsx";

const classes = {
  base: "first-letter:capitalize tracking-wide",
  primary:
    "w-full relative inline-block font-bold text-2xl text-gray-900 uppercase",
  secondary:
    "border-blue-primary border-l-4 pl-3 font-semibold text-gray-800 text-lg mb-1",
};

interface Props {
  label: string;
  as: "h1" | "h2" | "legend";
  id?: string;
  subheading?: string;
}

export default function Heading({
  label,
  as: Component,
  id,
  subheading,
}: Props) {
  return (
    <div className="flex w-full flex-col">
      <Component
        id={id}
        className={clsx(
          classes.base,
          Component === "h1" ? classes.primary : classes.secondary,
          Component === "h1" && (subheading ? "mb-6" : "mb-8"),
        )}
      >
        {label}
        {Component === "h1" && (
          <span className="-bottom-2 absolute left-0 h-1 w-full bg-blue-primary"></span>
        )}
      </Component>
      {subheading && (
        <p className="mb-6 w-full text-gray-dark text-sm sm:text-md">
          {subheading}
        </p>
      )}
    </div>
  );
}
