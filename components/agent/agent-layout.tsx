'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AgentHeader } from './agent-header';
import { AgentSidebar } from './agent-sidebar';

interface AgentLayoutProps {
  children: ReactNode;
  stats?: {
    total: number;
    active: number;
    views: number;
    inquiries: number;
  };
}

export function AgentLayout({ children, stats }: AgentLayoutProps) {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (profile && profile.role !== 'agent' && profile.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, profile, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || (profile && profile.role !== 'agent' && profile.role !== 'admin')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AgentHeader />

      <div className="flex flex-1">
        <AgentSidebar stats={stats} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}