'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

export default function RedirectPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function handleRedirect() {
      if (loading) return;
      if (!user) return router.push('/login');

      const role =
        profile?.role ??
        (await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle()
        ).data?.role;

      if (!role) return router.push('/login');

      if (role === 'admin') router.push('/admin');
      else if (role === 'agent') router.push('/agent');
      else router.push('/dashboard');
    }

    handleRedirect();
  }, [user, profile, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  );
}
