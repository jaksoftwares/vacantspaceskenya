'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart3, TrendingUp, Users, Building, Eye, Calendar, Activity, DollarSign } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AnalyticsData {
  totalUsers: number;
  totalAgents: number;
  totalListings: number;
  activeListings: number;
  totalViews: number;
  recentUsers: any[];
  recentListings: any[];
  agentPerformance: any[];
  monthlyStats: any[];
}

export default function AdminAnalyticsPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    totalAgents: 0,
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    recentUsers: [],
    recentListings: [],
    agentPerformance: [],
    monthlyStats: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (profile && profile.role !== 'admin') {
      router.push('/dashboard');
    } else if (user && profile?.role === 'admin') {
      fetchAnalytics();
    }
  }, [user, profile, authLoading, router]);

  const fetchAnalytics = async () => {
    try {
      // Fetch comprehensive analytics data
      const [usersData, listingsData, agentsData] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('listings').select(`
          *,
          profiles!listings_agent_id_fkey(full_name, avatar_url)
        `),
        supabase.from('profiles').select('*').eq('role', 'agent')
      ]);

      const users = usersData.data || [];
      const listings = listingsData.data || [];
      const agents = agentsData.data || [];

      // Calculate metrics
      const totalUsers = users.length;
      const totalAgents = agents.length;
      const totalListings = listings.length;
      const activeListings = listings.filter(l => l.status === 'active').length;
      const totalViews = listings.reduce((sum, l) => sum + (l.views_count || 0), 0);

      // Recent users (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentUsers = users
        .filter(u => new Date(u.created_at) > thirtyDaysAgo)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      // Recent listings
      const recentListings = listings
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      // Agent performance
      const agentPerformance = agents.map(agent => {
        const agentListings = listings.filter(l => l.agent_id === agent.id);
        const activeListings = agentListings.filter(l => l.status === 'active').length;
        const totalViews = agentListings.reduce((sum, l) => sum + (l.views_count || 0), 0);

        return {
          ...agent,
          totalListings: agentListings.length,
          activeListings,
          totalViews,
          conversionRate: totalViews > 0 ? Math.round((activeListings / totalViews) * 100) : 0
        };
      }).sort((a, b) => b.totalViews - a.totalViews);

      setAnalytics({
        totalUsers,
        totalAgents,
        totalListings,
        activeListings,
        totalViews,
        recentUsers,
        recentListings,
        agentPerformance,
        monthlyStats: [] // Could be implemented with more complex queries
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights into platform performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.totalAgents} agents registered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalListings}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.activeListings} currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.totalListings > 0 ? Math.round((analytics.activeListings / analytics.totalListings) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Listings active
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Performing Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.agentPerformance.slice(0, 5).map((agent, index) => (
                <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={agent.avatar_url} alt={agent.full_name} />
                      <AvatarFallback className="text-xs">
                        {agent.full_name?.charAt(0)?.toUpperCase() || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{agent.full_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {agent.totalListings} listings • {agent.activeListings} active
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{agent.totalViews}</p>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...analytics.recentUsers.map(user => ({
                type: 'user',
                title: `${user.full_name} joined the platform`,
                date: user.created_at,
                icon: <Users className="h-4 w-4" />
              })), ...analytics.recentListings.map(listing => ({
                type: 'listing',
                title: `${listing.title} was listed`,
                date: listing.created_at,
                icon: <Building className="h-4 w-4" />
              }))]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 8)
                .map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 border rounded">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recent User Registrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.recentUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar_url} alt={user.full_name} />
                  <AvatarFallback>
                    {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{user.full_name}</p>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'agent' ? 'default' : 'secondary'} className="text-xs">
                      {user.role}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}