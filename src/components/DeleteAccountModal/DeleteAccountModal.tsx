'use client';

import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';
import { useRouter } from 'next/navigation';
import { InputComponent } from '../InputComponent/InputComponent';

import { useState } from 'react';
import {
  DeleteAccountModalProps,
  FormTypes,
} from '@/@types/components/DeleteAccountModal/DeleteAccountModal';

import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '@/validation/deleteAccountValidation';
import { useForm } from 'react-hook-form';

export default function DeleteAccountModal({
  setModal,
}: DeleteAccountModalProps) {
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormTypes>({
    resolver: zodResolver(passwordSchema),
  });

  const handleDeleteAccount = async (data: FormTypes) => {
    try {
      await listaDeTarefas.deleteAccount(data);

      setSuccessStatus('Conta apagada com sucesso');
      setErrorStatus(null);

      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } catch (error) {
      setSuccessStatus(null);
      setErrorStatus('Senha incorreta');
    }
  };

  return (
    <div className="fixed left-0 top-0 flex h-screen w-full cursor-pointer flex-col items-center justify-center gap-1 bg-black bg-opacity-20">
      <article
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-md cursor-default flex-col gap-1 bg-color1  p-3"
      >
        <form onSubmit={handleSubmit(handleDeleteAccount)}>
          <h2 className="text-center text-2xl font-bold">APAGANDO CONTA</h2>
          <div className="grid gap-3">
            <div className="flex h-28 flex-col items-center justify-center">
              <p className="text-center text-xl font-bold text-red-500">
                ATENÇÃO!
              </p>
              <p className="text-center">
                Após confirmar você perdera sua conta e todas suas anotações
              </p>

              {successStatus && (
                <p className="text-center font-bold text-green-500">
                  {successStatus}
                </p>
              )}

              {errorStatus && (
                <p className="text-center font-bold text-red-500">
                  {errorStatus}
                </p>
              )}
            </div>

            <InputComponent
              label="Infome sua senha"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>
          <hr className="my-3" />
          <div className="flex items-center justify-end gap-1">
            <button
              type="submit"
              className="trasition rounded-md bg-red-500 p-2 text-white duration-150 hover:bg-red-600"
            >
              Apagar
            </button>
            <button
              onClick={() => setModal(false)}
              className="trasition rounded-md bg-green-500 p-2 text-white duration-150 hover:bg-green-600"
            >
              Cencelar
            </button>
          </div>
        </form>
      </article>
    </div>
  );
}
