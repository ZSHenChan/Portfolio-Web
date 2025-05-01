// app/providers.tsx (Client Component)
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { AppActionsContextProvider } from "./context/AppActionsContext";
import { UIStateContextProvider } from "./context/UIStateContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppActionsContextProvider>
        <UIStateContextProvider>{children}</UIStateContextProvider>
      </AppActionsContextProvider>
    </QueryClientProvider>
  );
}
