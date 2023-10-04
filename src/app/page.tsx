'use client';

import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';
import { useEffect, useState } from 'react';

import { taskType } from '@/@types/app/HomePage';

import TaskBody from '@/components/TaskBody/TaskBody';
import DeleteTaskModal from '@/components/DeleteTaskModal/DeleteTaskModal';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [tasks, setTasks] = useState<taskType[] | null>(null);
  const [modal, setModal] = useState({
    task: '',
    taskId: '',
  });

  const router = useRouter();

  async function getTasks() {
    try {
      const tasks = await listaDeTarefas.getAllTasks();

      setTasks(tasks.reverse());
    } catch {
      router.push('/signin');
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {tasks && (
        <section>
          <TaskBody getTasks={getTasks} tasks={tasks} setModal={setModal} />

          {modal.taskId && (
            <DeleteTaskModal
              getTasks={getTasks}
              task={modal.task}
              taskId={modal.taskId}
              setModal={setModal}
            />
          )}
        </section>
      )}
    </>
  );
}
