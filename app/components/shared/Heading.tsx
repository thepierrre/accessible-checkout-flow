import { clsx } from "clsx";

const classes = {
  base: "first-letter:capitalize tracking-wide",
  primary:
    "relative mb-6 inline-block font-bold text-3xl text-gray-900 uppercase",
  secondary:
    "border-blue-primary border-l-4 pl-3 font-semibold text-gray-800 text-xl",
};

interface Props {
  label: string;
  as: "h1" | "h2" | "legend";
  id?: string;
}

export default function Heading({ label, as: Component, id }: Props) {
  return (
    <Component
      id={id}
      className={clsx(
        classes.base,
        Component === "h1" ? classes.primary : classes.secondary,
      )}
    >
      {label}
      {Component === "h1" && (
        <span className="-bottom-2 absolute left-0 h-1 w-full bg-blue-primary"></span>
      )}
    </Component>
  );
}
