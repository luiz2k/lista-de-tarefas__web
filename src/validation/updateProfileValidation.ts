import z from 'zod';

export const newUsernameSchema = z.object({
  newUsername: z
    .string()
    .min(1, 'Insira pelo menos um carácter')
    .max(15, 'Não precisa ser um nome longo'),
});

export const newPasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8, 'No mínimo uma senha de 8 caracteres'),
});

export const newEmailSchema = z.object({
  currentEmail: z.string().email('Email inválido'),
  newEmail: z.string().email('Email inválido'),
});
