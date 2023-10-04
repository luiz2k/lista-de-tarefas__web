'use client';

import Link from 'next/link';

import { InputComponent } from '@/components/InputComponent/InputComponent';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSignUpSchema } from '@/validation/userValidation';
import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';
import { FormTypes } from '@/@types/components/SignUp/SignUp';

import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleForm = async (data: FormTypes) => {
    try {
      const registro = await listaDeTarefas.signUp(data);

      setErrorStatus(null);
      setSuccessStatus(registro.message);

      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      const errorMessage = error as { error: string };

      setSuccessStatus(null);
      return setErrorStatus(errorMessage?.error as string);
    }
  };

  return (
    <section className="flex flex-col items-center">
      <form
        method="POST"
        onSubmit={handleSubmit(handleForm)}
        className="flex w-full max-w-md flex-col gap-1"
      >
        <div className="h-16">
          <h1 className="text-center text-2xl font-bold">REGISTRO</h1>

          {successStatus && (
            <p className="text-center font-bold text-green-500">
              {successStatus}
            </p>
          )}

          {errorStatus && (
            <p className="text-center font-bold text-red-500">{errorStatus}</p>
          )}
        </div>

        <InputComponent
          label="Seu nome"
          type="text"
          maxLength={15}
          error={errors.username?.message}
          {...register('username')}
        />

        <InputComponent
          label="E-mail"
          type="text"
          {...register('email')}
          error={errors.email?.message}
        />

        <InputComponent
          label="Senha"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />

        <InputComponent
          label="Confirmar Senha"
          type="password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <hr className="my-2 " />

        <div className="flex items-center justify-between">
          <Link href={'/signin'} type="submit" className="hover:underline">
            Fazer Login
          </Link>

          <button
            type="submit"
            className="trasition rounded-md bg-green-500 p-2 text-white duration-150 hover:bg-green-600"
          >
            Registra-se
          </button>
        </div>
      </form>
    </section>
  );
}
