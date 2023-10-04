'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { userSignInSchema } from '@/validation/userValidation';

import { InputComponent } from '../InputComponent/InputComponent';
import { FormTypes } from '@/@types/components/SignIn/SignIn';

export default function SignIn() {
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({
    resolver: zodResolver(userSignInSchema),
  });

  const handleSignIn = async (data: FormTypes) => {
    try {
      const login = await listaDeTarefas.signIn(data);

      setErrorStatus(null);
      setSuccessStatus(login.message);

      setTimeout(() => {
        router.replace('/');
      }, 1000);
    } catch {
      setErrorStatus('E-mail ou senha inválido');
    }
  };
  return (
    <section className="flex flex-col items-center">
      <form
        method="POST"
        onSubmit={handleSubmit(handleSignIn)}
        className="flex w-full max-w-md flex-col gap-1"
      >
        <div className="h-16">
          <h1 className="text-center text-2xl font-bold">ENTRAR</h1>

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
          label="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />
        <InputComponent
          label="Senha"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />

        <hr className="my-2 " />

        <div className="flex items-center justify-between">
          <Link href={'/signup'} type="submit" className="hover:underline">
            Criar conta
          </Link>

          <button
            type="submit"
            className="trasition rounded-md bg-green-500 p-2 text-white duration-150 hover:bg-green-600"
          >
            Entrar
          </button>
        </div>
      </form>
    </section>
  );
}
