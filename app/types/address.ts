export type Address = {
  name: string;
  address: string;
  zip: string;
  country: string;
  phone?: {
    phoneCode: "";
    phoneNumber: "";
  };
  email: string;
  region?: string;
};

export type CombinedAddress = {
  shipping: Address;
  billing: Address;
  isBillingAddressSame: boolean;
};

export type AddressType = "shipping" | "billing";
