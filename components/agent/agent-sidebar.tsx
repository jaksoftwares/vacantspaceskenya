'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  Plus,
  Building,
  Eye,
  MessageSquare,
  TrendingUp,
  Settings,
  BarChart3,
  Users,
  FileText,
  Home
} from 'lucide-react';

interface AgentSidebarProps {
  stats?: {
    total: number;
    active: number;
    views: number;
    inquiries: number;
  };
}

export function AgentSidebar({ stats }: AgentSidebarProps) {
  const { profile } = useAuth();

  return (
    <div className="w-80 bg-white border-r border-slate-200 p-6 space-y-6 h-full overflow-y-auto">
      {/* Agent Profile */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              {profile?.full_name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{profile?.full_name}</h3>
              <p className="text-sm text-muted-foreground">Property Agent</p>
            </div>
          </div>
          <Button className="w-full" size="sm" asChild>
            <Link href="/agent/listings/new">
              <Plus className="h-4 w-4 mr-2" />
              New Listing
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Performance</h4>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats?.total || 0}</p>
                <p className="text-xs text-muted-foreground">Total Listings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats?.views || 0}</p>
                <p className="text-xs text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats?.inquiries || 0}</p>
                <p className="text-xs text-muted-foreground">Inquiries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {stats?.inquiries && stats.views > 0 ? Math.round((stats.inquiries / stats.views) * 100) : 0}%
                </p>
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Workspace</h4>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/agent">
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/agent/listings">
            <Building className="h-4 w-4 mr-2" />
            My Listings
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/agent/analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/agent/inquiries">
            <MessageSquare className="h-4 w-4 mr-2" />
            Inquiries
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/agent/reviews">
            <FileText className="h-4 w-4 mr-2" />
            Reviews
          </Link>
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Quick Actions</h4>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/agent/listings/new">
            <Plus className="h-4 w-4 mr-2" />
            Create Listing
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/browse">
            <Eye className="h-4 w-4 mr-2" />
            Browse Market
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/agent/settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </Button>
      </div>
    </div>
  );
}