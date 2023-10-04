'use client';

import { InputComponent } from '../InputComponent/InputComponent';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '@/validation/taskValidation';

import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';

import { FormTypes } from '@/@types/components/CreateTask/CreateTask';

import { useRouter } from 'next/navigation';

type CreateTaskProps = {
  getTasks: () => void;
};

export default function CreateTask({ getTasks }: CreateTaskProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTypes>({
    resolver: zodResolver(taskSchema),
  });

  async function handleCreateTask(data: FormTypes) {
    try {
      await listaDeTarefas.createTask(data);

      reset();
      getTasks();
    } catch {
      router.push('/signin');
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateTask)}
      className="flex flex-col gap-3"
    >
      <InputComponent
        label="Criar Tarefa"
        error={errors.task?.message}
        maxLength={20}
        {...register('task')}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="trasition rounded-md bg-green-500 p-2 text-white duration-150 hover:bg-green-600"
        >
          Criar Tarefa
        </button>
      </div>
    </form>
  );
}
