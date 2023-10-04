'use client';

import { ReactNode } from 'react';

import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';
import Link from 'next/link';

import {
  DateTimeFormatOptions,
  TaskCardProps,
} from '@/@types/components/TaskCard/TaskCard';
import { useRouter } from 'next/navigation';

const dateFormatting = (date: ReactNode) => {
  const unformattedDate = date as string;
  const newDate = new Date(unformattedDate);

  const options: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(newDate);
};

export default function TaskCard({
  getTasks,
  id,
  task,
  createdAt,
  status,
  setModal,
}: TaskCardProps) {
  const router = useRouter();

  const handleChangeStatus = async (taskId: string) => {
    try {
      await listaDeTarefas.changeSatus(taskId);

      getTasks();
    } catch {
      router.push('/signin');
    }
  };

  return (
    <article className="flex flex-col gap-1 rounded-md bg-black bg-opacity-10 p-2">
      <div className="flex flex-col gap-1">
        <p>
          <span className="font-bold">Tarefa: </span>
          <span
            className={`${
              status && 'italic text-[green] line-through opacity-60'
            }`}
          >
            {task}
          </span>
        </p>
        <p>
          <span className="font-bold">Criado em: </span>
          {dateFormatting(createdAt)}
        </p>
      </div>
      <div className="flex justify-end gap-1 text-white">
        <button
          onClick={() => handleChangeStatus(id)}
          className="trasition rounded-md bg-green-500 p-2 duration-150 hover:bg-green-600"
        >
          Concluído
        </button>
        <Link
          href={`/edit/${id}`}
          className="trasition rounded-md bg-orange-500 p-2 duration-150 hover:bg-orange-600"
        >
          Editar
        </Link>
        <button
          onClick={() =>
            setModal({
              task: task,
              taskId: id,
            })
          }
          className="trasition rounded-md bg-red-500 p-2 duration-150 hover:bg-red-600"
        >
          Apagar
        </button>
      </div>
    </article>
  );
}
