import { z } from 'zod';

export const ResponseSchema = z.object({
  status: z.string().min(1),
  message: z.string().optional(),
});
