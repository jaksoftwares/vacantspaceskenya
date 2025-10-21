'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Building, ShieldCheck, TrendingUp, Activity, Eye, MapPin, Calendar, MoreHorizontal, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  avatar_url?: string;
  created_at: string;
  is_verified: boolean;
}

interface Listing {
  id: string;
  title: string;
  status: string;
  price: number;
  location: string;
  created_at: string;
  agent_id: string;
  agent_name?: string;
  views_count?: number;
}

export default function AdminDashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAgents: 0,
    totalListings: 0,
    activeListings: 0,
    pendingVerifications: 0
  });
  const [users, setUsers] = useState<User[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

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
    } else if (user && profile?.role === 'admin') {
      fetchData();

      // Set up real-time subscriptions for live updates
      const usersSubscription = supabase
        .channel('profiles_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
          fetchData();
        })
        .subscribe();

      const listingsSubscription = supabase
        .channel('listings_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'listings' }, () => {
          fetchData();
        })
        .subscribe();

      const verificationsSubscription = supabase
        .channel('verification_requests_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'verification_requests' }, () => {
          fetchData();
        })
        .subscribe();

      return () => {
        usersSubscription.unsubscribe();
        listingsSubscription.unsubscribe();
        verificationsSubscription.unsubscribe();
      };
    }
  }, [user, profile, authLoading, router]);

  const fetchData = async () => {
    try {
      console.log('Fetching admin dashboard data...');

      // Fetch comprehensive data with error handling for each query
      const usersPromise = supabase.from('profiles').select('id, full_name, email, role, avatar_url, created_at, is_verified');
      const listingsPromise = supabase.from('listings').select(`
        id, title, status, price, location, created_at, user_id,
        profiles!listings_user_id_fkey(full_name)
      `).order('created_at', { ascending: false }).limit(50); // Add limit to prevent large queries
      const verificationsPromise = supabase.from('verification_requests').select('id').eq('status', 'pending');

      const [usersResult, listingsResult, verificationsResult] = await Promise.allSettled([
        usersPromise,
        listingsPromise,
        verificationsPromise
      ]);

      // Process users data
      if (usersResult.status === 'fulfilled' && usersResult.value.data && Array.isArray(usersResult.value.data)) {
        console.log('Users data:', usersResult.value.data);
        const agents = usersResult.value.data.filter(u => u.role === 'agent').length;
        const userData = usersResult.value.data;
        setStats(prev => ({
          ...prev,
          totalUsers: userData.length,
          totalAgents: agents
        }));
        setUsers(userData);
      } else if (usersResult.status === 'rejected') {
        console.error('Users query failed:', usersResult.reason);
      }

      // Process listings data
      if (listingsResult.status === 'fulfilled' && listingsResult.value.data && Array.isArray(listingsResult.value.data)) {
        console.log('Listings data:', listingsResult.value.data);
        const active = listingsResult.value.data.filter(l => l.status === 'active').length;
        const listingData = listingsResult.value.data;
        setStats(prev => ({
          ...prev,
          totalListings: listingData.length,
          activeListings: active
        }));

        // Structure listings with agent names
        const listingsWithAgents = listingData.map(listing => ({
          ...listing,
          agent_name: (listing.profiles as any)?.full_name || 'Unknown Agent',
          agent_id: listing.user_id // Use user_id as agent_id for consistency
        }));
        setListings(listingsWithAgents);
      } else if (listingsResult.status === 'rejected') {
        console.error('Listings query failed:', listingsResult.reason);
      }

      // Process verifications data
      if (verificationsResult.status === 'fulfilled' && verificationsResult.value.data && Array.isArray(verificationsResult.value.data)) {
        console.log('Verifications data:', verificationsResult.value.data);
        const verificationData = verificationsResult.value.data;
        setStats(prev => ({
          ...prev,
          pendingVerifications: verificationData.length
        }));
      } else if (verificationsResult.status === 'rejected') {
        console.error('Verifications query failed:', verificationsResult.reason);
      }

    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage the VacantSpacesKenya platform</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">{stats.totalAgents} agents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalListings}</div>
            <p className="text-xs text-muted-foreground">{stats.activeListings} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingVerifications}</div>
            <p className="text-xs text-muted-foreground">Requires review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Healthy</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+12.5%</div>
            <p className="text-xs text-muted-foreground">vs last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="verifications">Verifications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Comprehensive user management is available in the dedicated Users section.
                </p>
                <Button asChild>
                  <Link href="/admin/users">Go to User Management</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Listing Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Complete listing management tools are available in the dedicated Listings section.
                </p>
                <Button asChild>
                  <Link href="/admin/listings">Go to Listing Management</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Verification Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Review and manage verification requests in the dedicated Verifications section.
                </p>
                <Button asChild>
                  <Link href="/admin/verifications">Go to Verifications</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Detailed analytics and performance insights are available in the Analytics section.
                </p>
                <Button asChild>
                  <Link href="/admin/analytics">Go to Analytics</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}