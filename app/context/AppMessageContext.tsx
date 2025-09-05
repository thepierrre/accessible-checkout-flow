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
import { usePathname } from "next/navigation";

type AppMessageContextType = {
  appMessage: string | null;
  setAppMessage: Dispatch<SetStateAction<string | null>>;
  clearAppMessage: () => void;
};

const AppMessageContext = createContext<AppMessageContextType | undefined>(
  undefined,
);

export function useAppMessage() {
  const context = useContext(AppMessageContext);
  if (!context) {
    throw new Error("useAppMessage must be used within a AppMessageProvider");
  }
  return context;
}

export type AppMessageType = string | null;

export function AppMessageProvider({ children }: { children: ReactNode }) {
  const [appMessage, setAppMessage] = useState<AppMessageType>(null);
  const pathname = usePathname();

  function clearAppMessage() {
    setAppMessage(null);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies:  clearAppMessage would cause re-renders; we only want to run when pathname changes
  useEffect(() => {
    clearAppMessage();
  }, [pathname]);

  return (
    <AppMessageContext.Provider
      value={{ appMessage, setAppMessage, clearAppMessage }}
    >
      {children}
    </AppMessageContext.Provider>
  );
}
