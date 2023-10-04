import { Dispatch, SetStateAction } from 'react';

export type DeleteTaskModalProps = {
  getTasks: () => void;
  task: string;
  taskId: string;
  setModal: Dispatch<SetStateAction<{ task: string; taskId: string }>>;
};
