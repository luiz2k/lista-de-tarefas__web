'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';

export default function CheckAuthentication({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticatedUser, setAuthenticatedUser] = useState<boolean>(true);
  const router = useRouter();

  const getUsername = async () => {
    try {
      if (!localStorage.getItem('token')) return setAuthenticatedUser(false);

      const user = await listaDeTarefas.getUser();

      if (user) {
        return router.push('/');
      }

      setAuthenticatedUser(false);
    } catch {
      setAuthenticatedUser(false);
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  return <>{!authenticatedUser && children}</>;
}
