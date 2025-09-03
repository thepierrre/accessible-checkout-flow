import type { Appearance } from "@stripe/stripe-js";

export const APPEARANCE: Appearance = {
  theme: "flat",
  variables: {
    borderRadius: "0.375rem",
    colorBackground: "white",
    colorDanger: "#ff174d",
  },
  rules: {
    ".Label": {
      fontWeight: "500",
    },
    ".Input": {
      border: "1px solid #333",
      padding: "0.5rem",
      fontSize: "0.875rem",
    },
    ".Input:focus": {
      outline: "1px solid #3f5ad8",
      boxShadow: "none",
    },
    ".Input--invalid": {
      border: "1px solid var(--colorDanger)",
      outline: "none",
      boxShadow: "none",
    },
    ".Input--invalid:focus": {
      outline: "1px solid var(--colorDanger)",
      boxShadow: "none",
    },
  },
};
