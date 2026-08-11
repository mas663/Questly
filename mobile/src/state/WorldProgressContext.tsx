import React, { createContext, useContext } from "react";
import { useWorldProgress } from "../hooks/useWorldProgress";

type WorldProgressValue = ReturnType<typeof useWorldProgress>;

const WorldProgressContext = createContext<WorldProgressValue | null>(null);

export function WorldProgressProvider({ children }: { children: React.ReactNode }) {
  const value = useWorldProgress();
  return <WorldProgressContext.Provider value={value}>{children}</WorldProgressContext.Provider>;
}

export function useWorldProgressContext() {
  const ctx = useContext(WorldProgressContext);
  if (!ctx) {
    throw new Error("useWorldProgressContext harus dipakai di dalam WorldProgressProvider");
  }
  return ctx;
}
