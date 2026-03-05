/**
 * TanStack Query Setup für Negotiate Auth
 * 
 * Installation:
 *   npm install @tanstack/react-query
 * 
 * Usage in TanStack Start:
 *   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 *   import { api } from './lib/fetcher';
 * 
 *   // Component:
 *   const { data, isLoading } = useQuery({
 *     queryKey: ['users'],
 *     queryFn: () => api.get('/api/users'),
 *   });
 */

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Query Keys
export const queryKeys = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  // ... more keys
};
