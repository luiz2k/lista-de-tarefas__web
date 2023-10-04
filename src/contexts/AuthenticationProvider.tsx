'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';

import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';
import { createContextType } from '@/@types/contexts/AuthenticationProvider';

import { useRouter } from 'next/navigation';

export const AuthenticationContext = createContext<createContextType>({
  username: '',
  getUsername: () => Promise.resolve(),
});

export default function AuthenticationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  const getUsername = async () => {
    try {
      const user = await listaDeTarefas.getUser();

      setUsername(user.username);
    } catch {
      localStorage.removeItem('token');
      router.push('/signin');
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ username, getUsername }}>
      {username && children}
    </AuthenticationContext.Provider>
  );
}
