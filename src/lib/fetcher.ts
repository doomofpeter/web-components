/**
 * Negotiate Auth Fetcher für TanStack Start
 * 
 * Nutzung:
 *   import { fetcher } from './lib/fetcher';
 *   
 *   // GET
 *   const data = await fetcher('/api/users');
 *   
 *   // POST
 *   await fetcher('/api/users', { method: 'POST', body: JSON.stringify({ name: 'Test' }) });
 */

const BASE_URL = 'https://dein-backend.com'; // TODO: Anpassen!

type FetchOptions = RequestInit & {
  params?: Record<string, string>;
};

export async function fetcher<T = unknown>(
  url: string, 
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;
  
  // Query Params bauen
  let finalUrl = `${BASE_URL}${url}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    finalUrl += `?${searchParams}`;
  }
  
  const response = await fetch(finalUrl, {
    ...fetchOptions,
    credentials: 'include', // ✅ Wichtig: Negotiate Auth
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  // Leere Responses behandeln
  const text = await response.text();
  return text ? JSON.parse(text) : (null as T);
}

// Convenience Methods
export const api = {
  get: <T>(url: string, params?: Record<string, string>) => 
    fetcher<T>(url, { method: 'GET', params }),
  
  post: <T>(url: string, body?: unknown) => 
    fetcher<T>(url, { method: 'POST', body: JSON.stringify(body) }),
  
  put: <T>(url: string, body?: unknown) => 
    fetcher<T>(url, { method: 'PUT', body: JSON.stringify(body) }),
  
  patch: <T>(url: string, body?: unknown) => 
    fetcher<T>(url, { method: 'PATCH', body: JSON.stringify(body) }),
  
  delete: <T>(url: string) => 
    fetcher<T>(url, { method: 'DELETE' }),
};
