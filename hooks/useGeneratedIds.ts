import { useId } from "react";

export default function useGeneratedIds<const T extends string>(
  ...ids: T[]
): Record<T, string> {
  const baseId = useId();

  return ids.reduce(
    (record, name) => {
      record[name] = `${baseId}-${name}`;
      return record;
    },
    {} as Record<T, string>,
  );
}
