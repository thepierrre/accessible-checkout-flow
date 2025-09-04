import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

export const addressFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name can't be empty.")
    .max(100, "Name can have max. 255 characters.")
    .default(""),
  address: z
    .string()
    .min(1, "Address can't be empty.")
    .max(100, "Address can have max. 255 characters.")
    .default(""),
  zip: z
    .string()
    .min(1, "ZIP/Postal code can't be empty.")
    .max(100, "ZIP/Postal code can have max. 255 characters.")
    .default(""),
  region: z
    .string()
    .max(100, "State/Province can have max. 255 characters.")
    .optional()
    .default(""),
  country: z
    .string()
    .min(1, "Country/Territory can't be empty.")
    .max(100, "Country/Territory can have max. 255 characters.")
    .default(""),

  phone: z
    .string()
    .refine(
      (val) => {
        if (val === "") return true;
        const phone = parsePhoneNumberFromString(val);
        return phone?.isValid();
      },
      {
        message: "Enter a valid international phone number.",
      },
    )
    .optional(),
  email: z
    .string()
    .nonempty("Email can't be empty.")
    .email({ message: "Enter a valid email." })
    .max(100, "Email can have max. 255 characters."),
});

export const combinedAddressFormSchema = z.object({
  shipping: addressFormSchema,
  billing: addressFormSchema,
  isBillingAddressSame: z.boolean(),
});

export type CombinedAddressFormData = z.infer<typeof combinedAddressFormSchema>;
