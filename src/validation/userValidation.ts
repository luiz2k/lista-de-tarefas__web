import z from 'zod';

export const userSignInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Por favor, digite uma senha'),
});

export const userSignUpSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Insira pelo menos um carácter')
      .max(15, 'Não precisa ser um nome longo'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'No mínimo uma senha de 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
  .transform((fields) => ({
    username: fields.username,
    email: fields.email.toLowerCase(),
    password: fields.password,
    confirmPassword: fields.confirmPassword,
  }));
