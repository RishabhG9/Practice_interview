import { z } from 'zod';

export const userParamSchema = z.object({
  id: z.string().uuid({ message: 'Invalid UUID' }),
});

export const userQuerySchema = z.object({
  active: z.enum(['true', 'false'], {
    errorMap: () => ({ message: 'active must be "true" or "false"' }),
  }),
});
