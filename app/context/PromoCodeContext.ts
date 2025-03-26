import { createContext, ReactNode } from "react";

type PromoCode = { name: string; percentage: number } | undefined;

type PromoCodeContextType = {
  promoCode: PromoCode;
  setPromoCode: (promoCode: PromoCode) => void;
};

const PromoCodeContext = createContext<PromoCodeContextType>({
  promoCode: undefined,
  setPromoCode: () => {},
});

const PromoCodeProvider = ({ children }: { children: ReactNode }) => {};
