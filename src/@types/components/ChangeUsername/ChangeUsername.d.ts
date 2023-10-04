import z from 'zod';
import { newUsernameSchema } from '@/validation/updateProfileValidation';

export type FormTypes = z.infer<typeof newUsernameSchema>;
