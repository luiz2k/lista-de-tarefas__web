import { taskSchema } from '@/validation/taskValidation';
import { z } from 'zod';

export type FormTypes = z.infer<typeof taskSchema>;
