// app/providers.tsx (Client Component)
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RefsProvider } from "@/app/context/RefsContext";
import { ReactNode, useState } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <RefsProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RefsProvider>
  );
}
