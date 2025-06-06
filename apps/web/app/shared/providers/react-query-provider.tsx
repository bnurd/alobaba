import type { AppRouter } from "backend/types";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import cookies from "js-cookie";
import SuperJSON from "superjson";

import { TOKEN_KEY } from "~/shared/config";
import { getQueryClient } from "~/shared/libs/react-query";
import { TRPCProvider } from "~/shared/libs/trpc";

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${import.meta.env.VITE_API_URL}/trpc`,
          transformer: SuperJSON,
          headers: () => {
            const token = cookies.get(TOKEN_KEY);
            return token ? { Authorization: `Bearer ${token}` } : {};
          },
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
