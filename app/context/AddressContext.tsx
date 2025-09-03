"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAddressData,
  isBillingSameAsShipping,
} from "@/app/lib/addressDataUtils";
import type { Address, CombinedAddress } from "@/app/types/address";

type AddressContextType = {
  shipping: Address | undefined;
  billing: Address | undefined;
  isBillingAddressSame: boolean | undefined;
  setAddress: Dispatch<SetStateAction<CombinedAddress | undefined>>;
};

export const AddressContext = createContext<AddressContextType | undefined>(
  undefined,
);

export function useAddress() {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress was used outside the AddressProvider.");
  }
  return context;
}

export function AddressProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<CombinedAddress | undefined>(
    undefined,
  );

  useEffect(() => {
    const { shipping, billing } = getAddressData();
    const isBillingAddressSame = isBillingSameAsShipping();
    setAddress({ shipping, billing, isBillingAddressSame });
  }, []);

  const shipping = address?.shipping;
  const billing = address?.billing;
  const isBillingAddressSame = address?.isBillingAddressSame;

  return (
    <AddressContext.Provider
      value={{ shipping, billing, isBillingAddressSame, setAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
}
