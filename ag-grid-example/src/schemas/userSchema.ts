import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'user', 'guest']),
  status: z.enum(['active', 'inactive', 'pending']),
  department: z.string().min(1, 'Department is required'),
});

export type UserFormValues = z.infer<typeof userSchema>;
