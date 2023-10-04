import { InputComponent } from '../InputComponent/InputComponent';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { newUsernameSchema } from '@/validation/updateProfileValidation';

import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';

import { useContext, useState } from 'react';

import { AuthenticationContext } from '@/contexts/AuthenticationProvider';
import { FormTypes } from '@/@types/components/ChangeUsername/ChangeUsername';
import { useRouter } from 'next/navigation';

export default function ChangeUsername() {
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const { getUsername } = useContext(AuthenticationContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTypes>({
    resolver: zodResolver(newUsernameSchema),
  });

  const handleEditName = async (data: FormTypes) => {
    try {
      const changeUsername = await listaDeTarefas.changeUsername(data);

      reset();

      getUsername();

      setErrorStatus(null);
      setSuccessStatus(changeUsername.message);
    } catch (error) {
      router.push('/');
      setErrorStatus('Insira pelo menos um carácter');
      setSuccessStatus(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditName)}
      className="flex flex-col gap-1"
    >
      <div className="h-16">
        <h3 className="text-center text-xl">Alterar nome de usuário</h3>

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
        label="Novo de usuário"
        error={errors.newUsername?.message}
        maxLength={15}
        {...register('newUsername')}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="trasition w-fit rounded-md bg-orange-500 p-2 text-white duration-150 hover:bg-orange-600"
        >
          Confirmar
        </button>
      </div>
    </form>
  );
}
