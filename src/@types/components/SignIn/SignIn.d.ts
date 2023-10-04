import z from 'zod';
import { userSignInSchema } from '@/validation/userValidation';

type FormTypes = z.infer<typeof userSignInSchema>;
