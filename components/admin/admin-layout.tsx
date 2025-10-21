'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AdminHeader } from './admin-header';
import { AdminSidebar } from './admin-sidebar';

interface AdminLayoutProps {
  children: ReactNode;
  stats?: {
    totalUsers: number;
    totalAgents: number;
    totalListings: number;
    activeListings: number;
    pendingVerifications: number;
  };
}

export function AdminLayout({ children, stats }: AdminLayoutProps) {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (profile && profile.role !== 'admin') {
      // Redirect non-admins to their appropriate dashboards
      if (profile.role === 'agent') {
        router.push('/agent/agent');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, profile, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user || (profile && profile.role !== 'admin')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AdminHeader />

      <div className="flex flex-1 overflow-hidden">
        <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 overflow-hidden">
          <AdminSidebar stats={stats} />
        </div>
        <main className="flex-1 ml-80 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}