import { z, ZodType } from "zod";

export type CountriesInfo = {
  [name: string]: number[];
};

export type AddressType = "shipping" | "billing";

export const AddressSchema: ZodType<FormData> = z.object({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  region: z.string().optional(),
  country: z.string(),
  phone: z.string(),
  email: z.string().email(),
});
