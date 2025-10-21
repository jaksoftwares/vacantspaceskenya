'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Calendar, BarChart3, Users, Building, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ReportData {
  userReport: any[];
  listingReport: any[];
  performanceReport: any[];
  summaryStats: {
    totalUsers: number;
    totalAgents: number;
    totalListings: number;
    activeListings: number;
    totalRevenue: number;
  };
}

export default function AdminReportsPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [reports, setReports] = useState<ReportData>({
    userReport: [],
    listingReport: [],
    performanceReport: [],
    summaryStats: {
      totalUsers: 0,
      totalAgents: 0,
      totalListings: 0,
      activeListings: 0,
      totalRevenue: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [reportPeriod, setReportPeriod] = useState('30');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (profile && profile.role !== 'admin') {
      router.push('/dashboard');
    } else if (user && profile?.role === 'admin') {
      fetchReports();
    }
  }, [user, profile, authLoading, router, reportPeriod]);

  const fetchReports = async () => {
    try {
      const days = parseInt(reportPeriod);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Fetch data for reports
      const [usersData, listingsData, agentsData] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('listings').select(`
          *,
          profiles!listings_agent_id_fkey(full_name, email)
        `),
        supabase.from('profiles').select('*').eq('role', 'agent')
      ]);

      const users = usersData.data || [];
      const listings = listingsData.data || [];
      const agents = agentsData.data || [];

      // Generate reports
      const userReport = users.map(user => ({
        id: user.id,
        name: user.full_name,
        email: user.email,
        role: user.role,
        verified: user.is_verified,
        joinDate: user.created_at,
        lastActive: user.updated_at
      }));

      const listingReport = listings.map(listing => ({
        id: listing.id,
        title: listing.title,
        agent: listing.profiles?.full_name || 'Unknown',
        status: listing.status,
        price: listing.price,
        location: listing.location,
        views: listing.views_count || 0,
        createdAt: listing.created_at
      }));

      const performanceReport = agents.map(agent => {
        const agentListings = listings.filter(l => l.agent_id === agent.id);
        const activeListings = agentListings.filter(l => l.status === 'active').length;
        const totalViews = agentListings.reduce((sum, l) => sum + (l.views_count || 0), 0);
        const totalRevenue = agentListings.reduce((sum, l) => sum + (l.price || 0), 0);

        return {
          agentId: agent.id,
          agentName: agent.full_name,
          totalListings: agentListings.length,
          activeListings,
          totalViews,
          totalRevenue,
          conversionRate: totalViews > 0 ? Math.round((activeListings / totalViews) * 100) : 0,
          averagePrice: agentListings.length > 0 ? Math.round(totalRevenue / agentListings.length) : 0
        };
      });

      const summaryStats = {
        totalUsers: users.length,
        totalAgents: agents.length,
        totalListings: listings.length,
        activeListings: listings.filter(l => l.status === 'active').length,
        totalRevenue: listings.reduce((sum, l) => sum + (l.price || 0), 0)
      };

      setReports({
        userReport,
        listingReport,
        performanceReport,
        summaryStats
      });
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = (data: any[], filename: string) => {
    const csvContent = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(row => Object.values(row).map(value =>
        typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      ).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Generating reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and export detailed platform reports</p>
        </div>
        <Select value={reportPeriod} onValueChange={setReportPeriod}>
          <SelectTrigger className="w-48">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.summaryStats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.summaryStats.totalAgents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.summaryStats.totalListings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {reports.summaryStats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Complete user database with roles, verification status, and activity details.
              </div>
              <div className="text-2xl font-bold">{reports.userReport.length}</div>
              <p className="text-xs text-muted-foreground">Total registered users</p>
              <Button
                onClick={() => exportReport(reports.userReport, 'user_report')}
                className="w-full"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Listing Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Listing Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                All property listings with agent information, pricing, and performance metrics.
              </div>
              <div className="text-2xl font-bold">{reports.listingReport.length}</div>
              <p className="text-xs text-muted-foreground">Total property listings</p>
              <Button
                onClick={() => exportReport(reports.listingReport, 'listing_report')}
                className="w-full"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Agent performance metrics including listings, views, revenue, and conversion rates.
              </div>
              <div className="text-2xl font-bold">{reports.performanceReport.length}</div>
              <p className="text-xs text-muted-foreground">Active agents</p>
              <Button
                onClick={() => exportReport(reports.performanceReport, 'performance_report')}
                className="w-full"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round((reports.summaryStats.activeListings / reports.summaryStats.totalListings) * 100) || 0}%
              </div>
              <p className="text-sm text-muted-foreground">Active Listing Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {reports.summaryStats.totalAgents > 0 ? Math.round(reports.summaryStats.totalListings / reports.summaryStats.totalAgents) : 0}
              </div>
              <p className="text-sm text-muted-foreground">Average Listings per Agent</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                KSh {reports.summaryStats.totalListings > 0 ? Math.round(reports.summaryStats.totalRevenue / reports.summaryStats.totalListings).toLocaleString() : 0}
              </div>
              <p className="text-sm text-muted-foreground">Average Property Price</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}