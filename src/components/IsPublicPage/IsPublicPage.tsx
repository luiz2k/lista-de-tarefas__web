'use client';

import publicRoutes from '@/constants/publicRoutes';
import { usePathname } from 'next/navigation';

// Verifica se o usuário está autenticado
// Se estiver autenticado inpede do usuário a acessar a página de login e registro
import CheckAuthentication from '../CheckAuthentication/CheckAuthentication';

// Contexto que contém todo o fluxo de autenticação
import AuthenticationProvider from '@/contexts/AuthenticationProvider';

import Header from '../Header/Header';

export default function IsPublicPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const routes = Object.values(publicRoutes);

  // Verifica se a página é pública
  // Se for pública, renderiza o componente <CheckAuthentication>
  // Se for privada, renderiza o contexto <AuthenticationProvider>
  const isPublicPage = routes.includes(pathname);

  return (
    <>
      {isPublicPage && (
        <CheckAuthentication>
          <div className="m-auto max-w-md bg-color1 p-3 bgBreakpoint:shadow-2xl">
            {children}
          </div>
        </CheckAuthentication>
      )}

      {!isPublicPage && (
        <AuthenticationProvider>
          <div className="m-auto max-w-md bg-color1 p-3 bgBreakpoint:shadow-2xl">
            <Header />
            {children}
          </div>
        </AuthenticationProvider>
      )}
    </>
  );
}
