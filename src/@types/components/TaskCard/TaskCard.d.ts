import { Dispatch, SetStateAction } from 'react';

type DateTimeFormatOptions = Intl.DateTimeFormatOptions;

type TaskCardProps = {
  getTasks: () => void;
  id: string;
  task: string;
  createdAt: ReactNode;
  status: boolean;
  setModal: Dispatch<SetStateAction<{ task: string; taskId: string }>>;
};
