import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

const phoneSchema = z
  .object({
    phoneCode: z.string().optional().default(""),
    phoneNumber: z
      .string()
      .max(30, "Phone number is too long.")
      .optional()
      .default(""),
  })
  .superRefine(({ phoneCode, phoneNumber }, ctx) => {
    const num = phoneNumber?.trim() ?? "";

    // Both empty => valid
    if (!phoneCode && !num) return;

    // Code empty, number present but invalid
    if (!phoneCode && num && !/^[0-9\s\-().]+$/.test(num)) {
      ctx.addIssue({
        code: "custom",
        path: ["phoneNumber"],
        message: "Enter a valid phone number.",
      });
      return;
    }

    // Code empty, number exists
    if (!phoneCode && num) {
      ctx.addIssue({
        code: "custom",
        path: ["phoneCode"],
        message: "Code is required if phone number is entered.",
      });
      return;
    }

    // Code exists, number empty
    if (phoneCode && !num) {
      ctx.addIssue({
        code: "custom",
        path: ["phoneNumber"],
        message: "Phone number can’t be empty if code is entered.",
      });
      return;
    }

    // Both exist => check if code + number form a valid international number
    const full = `${phoneCode}${num}`;
    if (!isValidPhoneNumber(full)) {
      ctx.addIssue({
        code: "custom",
        path: ["phoneNumber"],
        message: "Enter a valid phone number.",
      });
    }
  });

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
    .min(1, "Postal code and city can't be empty.")
    .max(100, "Postal code and city can have max. 255 characters.")
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
  phone: phoneSchema.optional(),
  email: z
    .string()
    .nonempty("Email can't be empty.")
    .email({ message: "Enter a valid email." })
    .max(100, "Email can have max. 255 characters.")
    .default(""),
});

export const combinedAddressFormSchema = z.object({
  shipping: addressFormSchema,
  billing: addressFormSchema,
  isBillingAddressSame: z.boolean(),
});

export type CombinedAddressFormData = z.infer<typeof combinedAddressFormSchema>;
