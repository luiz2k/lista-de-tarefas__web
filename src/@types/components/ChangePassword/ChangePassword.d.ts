import z from 'zod';
import { newPasswordSchema } from '@/validation/updateProfileValidation';

export type FormTypes = z.infer<typeof newPasswordSchema>;
