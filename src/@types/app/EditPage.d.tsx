import z from 'zod';
import { taskSchema } from '@/validation/taskValidation';

export type FormTypes = z.infer<typeof taskSchema>;
