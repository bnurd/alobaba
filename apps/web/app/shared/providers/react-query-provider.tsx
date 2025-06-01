import type { AppRouter } from "backend/types";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTRPCClient, httpBatchStreamLink } from "@trpc/client";
import SuperJSON from "superjson";

import { getQueryClient } from "~/shared/libs/react-query";
import { TRPCProvider } from "~/shared/libs/trpc";

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchStreamLink({
          url: "http://localhost:3200/trpc",
          transformer: SuperJSON,
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" position="bottom" />
      </TRPCProvider>
    </QueryClientProvider>
  );
}
