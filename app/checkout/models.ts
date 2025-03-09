import { z, ZodType } from "zod";

export type CountriesInfo = {
  [name: string]: number[];
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
  region: string;
  country: string;
  tel: string;
  email: string;
};

export const AddressSchema: ZodType<FormData> = z.object({
  name: z
    .string({ message: "Name can't be empty." })
    .max(100, "Name can have max. 255 characters."),
  address: z
    .string({ message: "Address can't be empty." })
    .max(100, "Address can have max. 255 characters."),
  zip: z
    .string({ message: "ZIP / postal code can't be empty" })
    .max(100, "ZIP / postal code can have max. 255 characters."),
  region: z
    .string()
    .max(100, "State / province can have max. 255 characters.")
    .optional(),
  country: z
    .string({ message: "Country / territory can't be empty." })
    .max(100, "Country / territory can have max. 255 characters."),
  phone: z
    .string({ message: "Phone number can't be empty." })
    .max(15, "Phone number can have max. 15 digits."),
  email: z
    .string({ message: "Email can't be empty." })
    .email({ message: "Enter a valid email." })
    .max(100, "Email can have max. 255 characters."),
});
