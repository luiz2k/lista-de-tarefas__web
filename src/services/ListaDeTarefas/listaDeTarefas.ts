import {
  createTaskType,
  editTaskType,
  signInType,
  signUpType,
} from '@/@types/services/listaDeTarefa';
import { api } from './instance';

const signIn = async (bodyData: signInType) => {
  const settings = {
    method: 'POST',
    body: JSON.stringify(bodyData),
  };

  const data = await api('/auth/signin', settings);

  if (data?.token && data?.refreshToken) {
    localStorage.setItem(
      'token',
      JSON.stringify({
        accessToken: data.token,
        refreshToken: data.refreshToken,
      }),
    );
  }

  return data;
};

const signUp = async (bodyData: signUpType) => {
  const settings = {
    method: 'POST',
    body: JSON.stringify(bodyData),
  };

  const data = await api('/auth/signup', settings);

  if (data?.token && data?.refreshToken) {
    localStorage.setItem(
      'token',
      JSON.stringify({
        accessToken: data.token,
        refreshToken: data.refreshToken,
      }),
    );
  }

  return data;
};

const getUser = async () => {
  const data = api('/user');

  return data;
};

const getAllTasks = async () => {
  const data = api('/');

  return data;
};

const findTaskById = async (taskId: string) => {
  const data = api(`/find/${taskId}`);

  return data;
};

const createTask = async (bodyData: createTaskType) => {
  const settings = {
    method: 'POST',
    body: JSON.stringify(bodyData),
  };

  const data = api(`/create`, settings);

  return data;
};

const editTask = async (bodyData: editTaskType, taskId: string) => {
  const settings = {
    method: 'PATCH',
    body: JSON.stringify(bodyData),
  };

  const data = api(`/edit/${taskId}`, settings);

  return data;
};

const changeSatus = async (taskId: string) => {
  const settings = {
    method: 'PATCH',
  };

  const data = api(`/changestatus/${taskId}`, settings);

  return data;
};

const deleteTask = async (taskId: string) => {
  const settings = {
    method: 'DELETE',
  };

  const data = api(`/delete/${taskId}`, settings);

  return data;
};

const signOut = async () => {
  const token = JSON.parse(localStorage.getItem('token') as string);

  const settings = {
    method: 'POST',
    body: JSON.stringify({
      refreshToken: token.refreshToken,
    }),
  };

  const data = await api(`/user/signout`, settings);

  if (data.message) localStorage.removeItem('token');

  return data;
};

const changeUsername = async (newUsername: { newUsername: string }) => {
  const settings = {
    method: 'PATCH',
    body: JSON.stringify(newUsername),
  };

  const data = api(`/user/changeUsername`, settings);

  return data;
};

const changeEmail = async (newEmail: { newEmail: string }) => {
  const settings = {
    method: 'PATCH',
    body: JSON.stringify(newEmail),
  };

  const data = api(`/user/changeEmail`, settings);

  return data;
};

const changePassword = async (newPassword: { newPassword: string }) => {
  const settings = {
    method: 'PATCH',
    body: JSON.stringify(newPassword),
  };

  const data = api(`/user/changePassword`, settings);

  return data;
};

const deleteAccount = async (password: { password: string }) => {
  const token = JSON.parse(localStorage.getItem('token') as string);

  const settings = {
    method: 'DELETE',
    body: JSON.stringify({
      password: password.password,
      refreshToken: token?.refreshToken,
    }),
  };

  const data = await api(`/user/deleteaccount`, settings);

  if (data.message) localStorage.removeItem('token');

  return data;
};

export default {
  signIn,
  signUp,
  getUser,
  getAllTasks,
  findTaskById,
  createTask,
  editTask,
  changeSatus,
  deleteTask,
  signOut,
  changeUsername,
  changeEmail,
  changePassword,
  deleteAccount,
};
