import type { CombinedAddressFormData } from "@/app/schemas/addressFormSchema";

const DEFAULT_ADDRESS = {
  name: "",
  address: "",
  zip: "",
  country: "",
  phone: "",
  email: "",
  region: "",
};

export const DEFAULT_FORM_VALUES: CombinedAddressFormData = {
  shipping: { ...DEFAULT_ADDRESS },
  billing: { ...DEFAULT_ADDRESS },
  isBillingAddressSame: true,
};
