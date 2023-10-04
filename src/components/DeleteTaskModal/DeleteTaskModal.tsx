import { DeleteTaskModalProps } from '@/@types/components/DeleteTaskModal/DeleteTaskModal';
import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';
import { useRouter } from 'next/navigation';
import { HiArrowSmRight } from 'react-icons/hi';

export default function DeleteTaskModal({
  getTasks,
  task,
  taskId,
  setModal,
}: DeleteTaskModalProps) {
  const router = useRouter();

  const handleDeleteTask = async (taskId: string) => {
    try {
      await listaDeTarefas.deleteTask(taskId);

      getTasks();
      setModal({ task: '', taskId: '' });
    } catch {
      router.push('/signin');
    }
  };

  return (
    <div
      onClick={() => setModal({ task: '', taskId: '' })}
      className="fixed left-0 top-0 flex h-screen w-full cursor-pointer flex-col items-center justify-center gap-1 bg-black bg-opacity-20"
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-md cursor-default flex-col gap-1 bg-color1  p-3"
      >
        <h2 className="text-center text-2xl font-bold">APAGANDO TAREFA</h2>
        <p className="flex items-center gap-1 italic text-color3">
          <HiArrowSmRight />
          {task}
        </p>

        <hr className="my-3" />

        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => handleDeleteTask(taskId)}
            className="trasition rounded-md bg-red-500 p-2 text-white duration-150 hover:bg-red-600"
          >
            Apagar
          </button>
          <button
            onClick={() => setModal({ task: '', taskId: '' })}
            className="trasition rounded-md bg-green-500 p-2 text-white duration-150 hover:bg-green-600"
          >
            Cencelar
          </button>
        </div>
      </article>
    </div>
  );
}
