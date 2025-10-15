'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Plus, Building, Eye, MessageSquare, Star, TrendingUp, DollarSign, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AgentDashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    views: 0,
    inquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (profile && profile.role !== 'agent' && profile.role !== 'admin') {
      router.push('/dashboard');
    } else if (user) {
      fetchData();
    }
  }, [user, profile, authLoading, router]);

  const fetchData = async () => {
    if (!user) return;

    const { data: listingsData } = await supabase
      .from('listings')
      .select(`
        *,
        categories(name),
        counties(name),
        listing_images(url, is_primary)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (listingsData) {
      setListings(listingsData);
      const totalViews = listingsData.reduce((sum, listing) => sum + listing.views_count, 0);
      const totalInquiries = listingsData.reduce((sum, listing) => sum + listing.inquiries_count, 0);
      const activeListings = listingsData.filter(l => l.status === 'active').length;

      setStats({
        total: listingsData.length,
        active: activeListings,
        views: totalViews,
        inquiries: totalInquiries
      });
    }

    setLoading(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'rented': return 'bg-blue-100 text-blue-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Agent Dashboard</h1>
            <p className="text-muted-foreground">Manage your property listings</p>
          </div>
          <Button size="lg" asChild>
            <Link href="/agent/listings/new">
              <Plus className="h-4 w-4 mr-2" />
              New Listing
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">{stats.active} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.views}</div>
              <p className="text-xs text-muted-foreground">All time views</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inquiries}</div>
              <p className="text-xs text-muted-foreground">Total inquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.inquiries > 0 ? Math.round((stats.inquiries / stats.views) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Inquiry conversion</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Listings</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>

          {['all', 'active', 'draft', 'inactive'].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {listings
                .filter(l => tab === 'all' || l.status === tab)
                .map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex gap-6">
                        <div className="w-48 h-32 bg-slate-200 rounded-lg overflow-hidden shrink-0">
                          {listing.listing_images?.[0]?.url && (
                            <img
                              src={listing.listing_images[0].url}
                              alt={listing.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{listing.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {listing.counties?.name} • {listing.categories?.name}
                              </p>
                            </div>
                            <Badge className={getStatusColor(listing.status)}>
                              {listing.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {listing.description}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{listing.views_count} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{listing.inquiries_count} inquiries</span>
                            </div>
                            {listing.verification_status === 'verified' && (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                <span>Verified</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/listings/${listing.id}`}>View</Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/agent/listings/${listing.id}/edit`}>Edit</Link>
                            </Button>
                            <div className="ml-auto">
                              <span className="text-2xl font-bold text-primary">
                                KES {listing.price.toLocaleString()}
                              </span>
                              <span className="text-sm text-muted-foreground">/{listing.price_frequency}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              {listings.filter(l => tab === 'all' || l.status === tab).length === 0 && (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">No {tab !== 'all' ? tab : ''} listings yet</p>
                  <Button asChild>
                    <Link href="/agent/listings/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Listing
                    </Link>
                  </Button>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}