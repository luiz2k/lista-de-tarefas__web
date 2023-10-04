import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import IsPublicPage from '@/components/IsPublicPage/IsPublicPage';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lista de Tarefas',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} bg-color1 bgBreakpoint:bg-color2`}>
        <main className="py-10">
          <IsPublicPage>{children}</IsPublicPage>
        </main>
      </body>
    </html>
  );
}
