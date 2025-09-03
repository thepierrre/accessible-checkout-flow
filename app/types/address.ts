export type Address = {
  name: string;
  address: string;
  zip: string;
  country: string;
  phoneCode?: string;
  phoneNumber?: string;
  email: string;
  region?: string;
};

export type CombinedAddress = {
  shipping: Address;
  billing: Address;
  isBillingAddressSame: boolean;
};

export type AddressType = "shipping" | "billing";
