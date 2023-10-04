import { InputComponent } from '../InputComponent/InputComponent';

// import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { newPasswordSchema } from '@/validation/updateProfileValidation';

import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';

import { useState } from 'react';
import { FormTypes } from '@/@types/components/ChangePassword/ChangePassword';

export default function ChangePassword() {
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTypes>({
    resolver: zodResolver(newPasswordSchema),
  });

  const handleChangePassword = async (data: FormTypes) => {
    try {
      const changePassword = await listaDeTarefas.changePassword(data);

      reset();

      setErrorStatus(null);
      setSuccessStatus(changePassword.message);
    } catch (error) {
      setSuccessStatus(null);
      setErrorStatus('Sua atual incorreta');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleChangePassword)}
      className="flex flex-col gap-1"
    >
      <div className="h-16">
        <h3 className="text-center text-xl">Alterar senha</h3>

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
        label="Senha atual"
        error={errors.currentPassword?.message}
        {...register('currentPassword')}
      />

      <InputComponent
        label="Nova Senha"
        error={errors.newPassword?.message}
        {...register('newPassword')}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="trasition w-fit rounded-md bg-red-500 p-2 text-white duration-150 hover:bg-red-600"
        >
          Confirmar
        </button>
      </div>
    </form>
  );
}
