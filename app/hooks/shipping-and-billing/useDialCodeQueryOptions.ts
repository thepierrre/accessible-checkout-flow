import { useMemo } from "react";

interface CountryOption {
  code: string;
  name: string;
  dialCode: string;
}

export function useDialCodeQueryOptions(
  options: CountryOption[],
  query: string,
) {
  return useMemo(() => {
    if (!query) return options;
    return options.filter(
      (c) =>
        c.dialCode.replace("+", "").startsWith(query.replace("+", "")) ||
        c.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [options, query]);
}
