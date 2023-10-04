import { GoSignOut } from 'react-icons/go';
import { BsFillPersonFill, BsFillHouseDoorFill } from 'react-icons/bs';

import listaDeTarefas from '@/services/ListaDeTarefas/listaDeTarefas';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

import { useContext } from 'react';
import { AuthenticationContext } from '@/contexts/AuthenticationProvider';

export default function Header() {
  const router = useRouter();

  const pathname = usePathname();

  const { username } = useContext(AuthenticationContext);

  const handleSignOut = async () => {
    try {
      await listaDeTarefas.signOut();

      router.push('/signin');
    } catch {
      router.push('/signin');
    }
  };

  return (
    <header className="m-auto mb-3 max-w-md">
      <div className="flex flex-wrap items-center justify-center gap-2 p-2 custonBreakpoint:justify-between">
        <h2 className="text-xl">
          Olá <span className="font-bold">{username}</span>
        </h2>

        <nav>
          <ul className="flex gap-1">
            {pathname !== '/' && (
              <li>
                <Link
                  href={'/'}
                  className="trasition flex items-center justify-center gap-1 rounded-md bg-green-500 p-2 text-white duration-150 hover:bg-green-600"
                >
                  Início <BsFillHouseDoorFill />
                </Link>
              </li>
            )}
            {pathname !== '/profile' && (
              <li>
                <Link
                  href={'/profile'}
                  className="trasition flex items-center justify-center gap-1 rounded-md bg-orange-500 p-2 text-white duration-150 hover:bg-orange-600"
                >
                  Perfil <BsFillPersonFill />
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={handleSignOut}
                className="trasition flex items-center justify-center gap-1 rounded-md bg-red-500 p-2 text-white duration-150 hover:bg-red-600"
              >
                Sair <GoSignOut />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <hr />
    </header>
  );
}
