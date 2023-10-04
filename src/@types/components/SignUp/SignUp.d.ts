import z from 'zod';
import { userSignUpSchema } from '@/validation/userValidation';

export type FormTypes = z.infer<typeof userSignUpSchema>;
