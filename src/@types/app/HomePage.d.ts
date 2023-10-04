import { ReactNode } from 'react';

export type taskType = {
  _id: string;
  task: string;
  status: boolean;
  createdAt: ReactNode;
};
