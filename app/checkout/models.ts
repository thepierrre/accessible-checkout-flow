import { z, ZodType } from "zod";

export type CountriesInfo = {
  [countryName: string]: number[];
};

export type CheckoutSteps =
  | "Basket"
  | "Shipping & Billing"
  | "Review Order"
  | "Payment"
  | "Order complete";

export type AddressType = "shipping" | "billing";

export type AddressData = {
  name: string;
  address: string;
  zip: string;
  region?: string;
  country: string;
  phone: string;
  email: string;
};

export const addressFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name can't be empty.")
    .max(100, "Name can have max. 255 characters."),
  address: z
    .string()
    .min(1, "Address can't be empty.")
    .max(100, "Address can have max. 255 characters."),
  zip: z
    .string()
    .min(1, "ZIP / postal code can't be empty.")
    .max(100, "ZIP / postal code can have max. 255 characters."),
  region: z
    .string()
    .max(100, "State / province can have max. 255 characters.")
    .optional(),
  country: z
    .string()
    .min(1, "Country / territory can't be empty.")
    .max(100, "Country / territory can have max. 255 characters."),
  phone: z
    .string()
    .min(1, "Phone number can't be empty.")
    .max(15, "Phone number can have max. 15 digits."),
  email: z
    .string()
    .email({ message: "Enter a valid email." })
    .min(1, "Email can't be empty.")
    .max(100, "Email can have max. 255 characters."),
});

export const combinedAddressFormSchema = z.object({
  shipping: addressFormSchema,
  billing: addressFormSchema,
  isBillingAddressSame: z.boolean(),
});

export type PartialAddressFormData = z.infer<typeof addressFormSchema>;

export type CombinedAddressFormData = z.infer<typeof combinedAddressFormSchema>;
