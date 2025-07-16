'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import superjson from 'superjson';
import type { AppRouter } from './routers/_app';
import { makeQueryClient } from './query-client';

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

let browserQueryClient: QueryClient;

function getQueryClient(): QueryClient {
  if (typeof window === 'undefined') {
    return makeQueryClient(); // SSR: always return a fresh QueryClient
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient(); // CSR: reuse to prevent remount
  }
  return browserQueryClient;
}

function getUrl(): string {
  if (typeof window !== 'undefined') return '/api/trpc'; // browser: relative URL
  if (process.env.NEXT_PUBLIC_APP_URL) return `https://${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`;
  return 'http://localhost:3000/api/trpc'; // fallback for dev
}

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: getUrl(),
          transformer: superjson, // optional: if you use superjson
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
