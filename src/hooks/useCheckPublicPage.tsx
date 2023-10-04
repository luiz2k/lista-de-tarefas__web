'use client';

import publicRoutes from '@/constants/publicRoutes';
import { usePathname } from 'next/navigation';

export default function checkPublicPage() {
  const pathname = usePathname();
  const routes = Object.values(publicRoutes);
  const isPublicPage = routes.includes(pathname);

  return isPublicPage;
}
