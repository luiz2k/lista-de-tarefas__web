'use client';

import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';
import { InputComponent } from '@/components/InputComponent/InputComponent';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { taskSchema } from '@/validation/taskValidation';

import { HiArrowSmRight } from 'react-icons/hi';
import { FormTypes } from '@/@types/app/EditPage.d';

export default function page({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<FormTypes | null>(null);
  const taskId = params.id;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({
    resolver: zodResolver(taskSchema),
  });

  const handleEditTask = async (data: FormTypes) => {
    try {
      await listaDeTarefas.editTask(data, taskId);

      router.push('/');
    } catch {
      router.push('/signin');
    }
  };

  useEffect(() => {
    async function getTask(taskId: string) {
      try {
        const task = await listaDeTarefas.findTaskById(taskId);

        setTask(task);
      } catch {
        router.push('/signin');
      }
    }

    getTask(taskId);
  }, []);

  return (
    <>
      {task && (
        <section
          onSubmit={handleSubmit(handleEditTask)}
          className="flex flex-col items-center"
        >
          <form
            method="POST"
            className="flex w-full max-w-md flex-col gap-1  text-white"
          >
            <div className="h-16">
              <h1 className="text-center text-2xl font-bold text-black">
                EDITANDO TAREFA
              </h1>

              <p className="flex items-center gap-1 italic text-color3">
                <HiArrowSmRight />
                {task?.task}
              </p>
            </div>

            <InputComponent
              label="Novo nome"
              error={errors.task?.message}
              {...register('task')}
            />

            <hr className="my-3 " />

            <div className="flex items-center justify-end gap-1">
              <button
                type="submit"
                className="trasition rounded-md bg-orange-500 p-2 duration-150 hover:bg-orange-600"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => router.push(`/`)}
                className="trasition rounded-md bg-green-500 p-2 duration-150 hover:bg-green-600"
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
