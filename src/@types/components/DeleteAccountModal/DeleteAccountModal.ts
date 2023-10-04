import { passwordSchema } from '@/validation/deleteAccountValidation';
import { Dispatch, SetStateAction } from 'react';

export type DeleteAccountModalProps = {
  setModal: Dispatch<SetStateAction<boolean>>;
};

import z from 'zod';

export type FormTypes = z.infer<typeof passwordSchema>;
