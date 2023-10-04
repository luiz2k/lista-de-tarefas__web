import { TaskBodyProps } from '@/@types/components/TaskBody/TaskBody';
import CreateTask from '../CreateTask/CreateTask';
import TaskCard from '../TaskCard/TaskCard';

export default function TaskBody({ getTasks, tasks, setModal }: TaskBodyProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-1">
        <div>
          <div className="h-16">
            <h1 className="text-center text-2xl font-bold">LISTA DE TAREFAS</h1>
          </div>

          <CreateTask getTasks={getTasks} />
        </div>

        <hr className="my-3" />

        {tasks?.length === 0 ? (
          <section>
            <p className="text-center text-xl font-bold text-red-500">
              VOCÊ NÃO TEM NENHUMA TAREFA
            </p>
          </section>
        ) : (
          <section className="flex flex-col gap-2">
            <h2 className="text-center text-xl font-bold">TAREFAS</h2>
            {tasks?.map((task) => (
              <TaskCard
                getTasks={getTasks}
                key={task._id}
                id={task._id}
                task={task.task}
                createdAt={task.createdAt}
                status={task.status}
                setModal={setModal}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
