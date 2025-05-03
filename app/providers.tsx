// app/providers.tsx (Client Component)
"use client";

import { ReactNode } from "react";
import { AppActionsContextProvider } from "./context/AppActionsContext";
import { UIStateContextProvider } from "./context/UIStateContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AppActionsContextProvider>
      <UIStateContextProvider>{children}</UIStateContextProvider>
    </AppActionsContextProvider>
  );
}
