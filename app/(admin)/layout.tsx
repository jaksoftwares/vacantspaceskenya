import { ReactNode } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AdminLayoutProps) {
  return <AdminLayout>{children}</AdminLayout>;
}