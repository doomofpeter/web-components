/**
 * TanStack Query + Zod API Client für Negotiate Auth
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

// ============== SCHEMAS ==============

// User Schema Beispiel
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

// API Response Wrapper
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    message: z.string().optional(),
  });

// Error Schema
export const ApiErrorSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

// ============== FETCHER ==============

const BASE_URL = (import.meta as any).env?.VITE_API_URL || 'https://dein-backend.com';

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include', // ✅ Negotiate Auth
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// ============== QUERY HOOKS ==============

/**
 * Generic fetch hook mit Zod validation
 */
export function useApiQuery<T extends z.ZodType>(
  schema: T,
  endpoint: string,
  options?: {
    queryKey?: unknown[];
    enabled?: boolean;
  }
) {
  return useQuery({
    queryKey: options?.queryKey || [endpoint],
    queryFn: async () => {
      const response = await fetchApi<z.infer<T>>(endpoint);
      return schema.parse(response); // Zod validation
    },
    enabled: options?.enabled,
  });
}

/**
 * Generic mutation hook
 */
export function useApiMutation<TInput, TOutput>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  schema?: z.ZodType<TOutput>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TInput) => {
      const response = await fetchApi<TOutput>(endpoint, {
        method,
        body: JSON.stringify(data),
      });
      
      if (schema) {
        return schema.parse(response);
      }
      return response;
    },
    onSuccess: () => {
      // Optionally invalidate queries
      queryClient.invalidateQueries();
    },
  });
}

// ============== PREBUILT HOOKS ==============

// Users
export function useUsers() {
  return useApiQuery(
    z.array(UserSchema),
    '/api/users'
  );
}

export function useUser(id: string) {
  return useApiQuery(
    UserSchema,
    `/api/users/${id}`,
    { queryKey: ['user', id] }
  );
}

export function useCreateUser() {
  return useApiMutation<Omit<User, 'id' | 'createdAt'>, User>('/api/users', 'POST', UserSchema);
}

export function useUpdateUser() {
  return useApiMutation<Partial<User> & { id: string }, User>('/api/users', 'PATCH', UserSchema);
}

export function useDeleteUser() {
  return useApiMutation<{ id: string }, { success: boolean }>('/api/users', 'DELETE');
}
