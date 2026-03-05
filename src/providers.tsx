/**
 * QueryClient Provider Setup
 * 
 * Usage:
 *   import { QueryProvider } from './providers';
 *   
 *   <QueryProvider>
 *     <App />
 *   </QueryProvider>
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      gcTime: 1000 * 60 * 30, // 30 min (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

interface Props {
  children: ReactNode;
}

export function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// Query Keys Export
export const queryKeys = {
  all: ['api'] as const,
  users: () => [...queryKeys.all, 'users'] as const,
  user: (id: string) => [...queryKeys.users(), id] as const,
  // Add more as needed
};
