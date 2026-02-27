import { User } from './types';

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', department: 'Engineering', lastLogin: '2026-02-26T10:30:00Z', createdAt: '2024-01-15T08:00:00Z' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', department: 'Marketing', lastLogin: '2026-02-25T14:20:00Z', createdAt: '2024-03-20T10:30:00Z' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'user', status: 'inactive', department: 'Sales', lastLogin: '2026-01-10T09:15:00Z', createdAt: '2024-02-28T11:45:00Z' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'user', status: 'active', department: 'Engineering', lastLogin: '2026-02-26T08:45:00Z', createdAt: '2024-04-05T14:20:00Z' },
  { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'guest', status: 'pending', department: 'HR', lastLogin: '2026-02-20T16:00:00Z', createdAt: '2025-01-10T09:30:00Z' },
  { id: '6', name: 'Diana Evans', email: 'diana@example.com', role: 'admin', status: 'active', department: 'Finance', lastLogin: '2026-02-26T11:00:00Z', createdAt: '2023-11-22T08:15:00Z' },
  { id: '7', name: 'Frank Garcia', email: 'frank@example.com', role: 'user', status: 'active', department: 'Engineering', lastLogin: '2026-02-24T13:30:00Z', createdAt: '2024-06-18T10:00:00Z' },
  { id: '8', name: 'Grace Harris', email: 'grace@example.com', role: 'user', status: 'inactive', department: 'Marketing', lastLogin: '2025-12-15T10:45:00Z', createdAt: '2024-05-12T15:30:00Z' },
  { id: '9', name: 'Henry Jackson', email: 'henry@example.com', role: 'user', status: 'active', department: 'Sales', lastLogin: '2026-02-25T09:00:00Z', createdAt: '2024-08-01T11:20:00Z' },
  { id: '10', name: 'Ivy Martinez', email: 'ivy@example.com', role: 'guest', status: 'pending', department: 'Operations', lastLogin: '2026-02-22T14:10:00Z', createdAt: '2025-02-14T09:45:00Z' },
];
