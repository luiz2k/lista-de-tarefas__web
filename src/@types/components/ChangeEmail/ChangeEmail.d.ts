import z from 'zod';
import { newEmailSchema } from '@/validation/updateProfileValidation';

export type FormTypes = z.infer<typeof newEmailSchema>;
