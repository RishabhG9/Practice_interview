import { z } from 'zod';

export const userParamSchema = z.object({
  id: z.string().uuid({ message: 'Invalid UUID' }),
});

export const userQuerySchema = z.object({
  active: z.enum(['true', 'false'], {
    errorMap: () => ({ message: 'active must be "true" or "false"' }),
  }),
});

export const createUserBodySchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
  // password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
});

export const emailQuerySchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
});