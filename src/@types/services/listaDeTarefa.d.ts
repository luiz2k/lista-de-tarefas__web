export type signInType = {
  email: string;
  password: string;
};

export type signUpType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type createTaskType = {
  task: string;
};

export type editTaskType = {
  task: string;
};
