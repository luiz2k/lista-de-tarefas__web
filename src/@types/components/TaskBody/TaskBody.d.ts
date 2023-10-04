import { taskType } from '@/@types/app/HomePage';
import { Dispatch, SetStateAction } from 'react';

type TaskBodyProps = {
  getTasks: () => void;
  tasks: taskType[] | null;
  setModal: Dispatch<SetStateAction<{ task: string; taskId: string }>>;
};
