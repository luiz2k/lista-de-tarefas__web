import { InputComponent } from '../InputComponent/InputComponent';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { newEmailSchema } from '@/validation/updateProfileValidation';

import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';

import { useState } from 'react';
import { FormTypes } from '@/@types/components/ChangeEmail/ChangeEmail';

export default function ChangeEmail() {
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTypes>({
    resolver: zodResolver(newEmailSchema),
  });

  const handleChangeEmail = async (data: FormTypes) => {
    try {
      const changeEmail = await listaDeTarefas.changeEmail(data);

      reset();

      setErrorStatus(null);
      setSuccessStatus(changeEmail.message);
    } catch (error) {
      console.log(error);

      setErrorStatus('E-mail atual incorreto');
      setSuccessStatus(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleChangeEmail)}
      className="flex flex-col gap-1"
    >
      <div className="h-16">
        <h3 className="text-center text-xl">Alterar e-mail</h3>

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
        label="E-mail atual"
        error={errors.currentEmail?.message}
        {...register('currentEmail')}
      />

      <InputComponent
        label="Novo E-mail"
        error={errors.newEmail?.message}
        {...register('newEmail')}
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
