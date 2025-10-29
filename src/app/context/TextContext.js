"use client";
import { createContext, useContext } from "react";
import { TEXT } from "../utils/ Text";

const TextContext = createContext(TEXT);

// Export hook for easy use
export const useText = () => useContext(TextContext);

export function TextProvider({ children }) {
  return <TextContext.Provider value={TEXT}>{children}</TextContext.Provider>;
}
