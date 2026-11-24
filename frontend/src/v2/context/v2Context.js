import { createContext, useContext } from "react";

export const V2StoreContext = createContext(null);

export function useV2Store() {
  const ctx = useContext(V2StoreContext);
  if (!ctx) {
    throw new Error("useV2Store must be used inside V2StoreProvider");
  }
  return ctx;
}
