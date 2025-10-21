'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  Users,
  Building,
  ShieldCheck,
  BarChart3,
  Settings,
  FileText,
  Activity,
  TrendingUp,
  AlertTriangle,
  Database,
  Home
} from 'lucide-react';

interface AdminSidebarProps {
  stats?: {
    totalUsers: number;
    totalAgents: number;
    totalListings: number;
    activeListings: number;
    pendingVerifications: number;
  };
}

export function AdminSidebar({ stats }: AdminSidebarProps) {
  const { profile } = useAuth();

  return (
    <div className="w-80 bg-white border-r border-slate-200 p-6 space-y-6 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
      {/* Admin Profile */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{profile?.full_name}</h3>
              <p className="text-sm text-muted-foreground">Administrator</p>
            </div>
          </div>
          <div className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded">
            System Access Level: Full
          </div>
        </CardContent>
      </Card>

      {/* Platform Overview */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Platform Overview</h4>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats?.totalListings || 0}</p>
                <p className="text-xs text-muted-foreground">Total Listings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{stats?.pendingVerifications || 0}</p>
                <p className="text-xs text-muted-foreground">Pending Verifications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">Healthy</p>
                <p className="text-xs text-muted-foreground">System Status</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Management</h4>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/admin">
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/admin/users">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/admin/listings">
            <Building className="h-4 w-4 mr-2" />
            Listing Management
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/admin/verifications">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Verifications
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/admin/analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/admin/reports">
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </Link>
        </Button>
      </div>

      {/* System */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">System</h4>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/admin/system">
            <Database className="h-4 w-4 mr-2" />
            System Health
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/admin/logs">
            <AlertTriangle className="h-4 w-4 mr-2" />
            System Logs
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/admin/settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </Button>
      </div>
    </div>
  );
}