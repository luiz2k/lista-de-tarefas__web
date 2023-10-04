import z from 'zod';

export const passwordSchema = z.object({
  password: z.string().min(1, 'Por favor, digite sua senha'),
});
