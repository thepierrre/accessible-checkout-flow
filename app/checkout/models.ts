import { z } from "zod";

export type CountriesInfo = {
  [countryName: string]: number;
};

export type CheckoutSteps =
  | "Cart"
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
  phone: { code: string; number: string };
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
    .min(1, "ZIP/Postal code can't be empty.")
    .max(100, "ZIP/Postal code can have max. 255 characters."),
  region: z
    .string()
    .max(100, "State/Province can have max. 255 characters.")
    .optional(),
  country: z
    .string()
    .min(1, "Country/Territory can't be empty.")
    .max(100, "Country/Territory can have max. 255 characters."),
  phoneCode: z
    .string()
    .min(1, "Phone number can't be empty.")
    .max(15, "Phone number can have max. 15 digits."),
  phoneNumber: z
    .string()
    .max(15, "Phone number can have max. 15 digits.")
    .regex(new RegExp("^[0-9]*$"), "Enter a numerical value.")
    .optional(),
  email: z
    .string()
    .min(1, "Email can't be empty.")
    .email({ message: "Enter a valid email." })
    .max(100, "Email can have max. 255 characters."),
});

export const combinedAddressFormSchema = z.object({
  shipping: addressFormSchema,
  billing: addressFormSchema,
  isBillingAddressSame: z.boolean(),
});

export type CombinedAddressFormData = z.infer<typeof combinedAddressFormSchema>;
