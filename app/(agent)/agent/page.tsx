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

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 bg-slate-50 border-r border-slate-200 p-6 space-y-6">
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
                    <p className="text-2xl font-bold">{stats.total}</p>
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
                    <p className="text-2xl font-bold">{stats.views}</p>
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
                    <p className="text-2xl font-bold">{stats.inquiries}</p>
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
                      {stats.inquiries > 0 ? Math.round((stats.inquiries / stats.views) * 100) : 0}%
                    </p>
                    <p className="text-xs text-muted-foreground">Conversion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
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
              <Link href="/agent/analytics">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">My Listings</h1>
              <p className="text-muted-foreground">Manage and track your property listings</p>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All ({listings.length})</TabsTrigger>
                <TabsTrigger value="active">
                  Active ({listings.filter(l => l.status === 'active').length})
                </TabsTrigger>
                <TabsTrigger value="draft">
                  Drafts ({listings.filter(l => l.status === 'draft').length})
                </TabsTrigger>
                <TabsTrigger value="inactive">
                  Inactive ({listings.filter(l => l.status === 'inactive').length})
                </TabsTrigger>
              </TabsList>

              {['all', 'active', 'draft', 'inactive'].map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-4">
                  {listings
                    .filter(l => tab === 'all' || l.status === tab)
                    .map((listing) => (
                      <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h3 className="text-xl font-semibold mb-1">{listing.title}</h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {listing.counties?.name} • {listing.categories?.name}
                                  </p>
                                  <p className="text-muted-foreground line-clamp-2">
                                    {listing.description}
                                  </p>
                                </div>
                                <div className="text-right ml-4">
                                  <Badge className={`${getStatusColor(listing.status)} mb-2`}>
                                    {listing.status}
                                  </Badge>
                                  <div className="text-2xl font-bold text-primary">
                                    KES {listing.price.toLocaleString()}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    /{listing.price_frequency}
                                  </div>
                                </div>
                              </div>

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
                                  <Link href={`/listings/${listing.id}`}>View Listing</Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/agent/listings/${listing.id}/edit`}>Edit</Link>
                                </Button>
                                <Button variant="outline" size="sm">
                                  Analytics
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}

                  {listings.filter(l => tab === 'all' || l.status === tab).length === 0 && (
                    <Card className="p-12 text-center border-dashed">
                      <div className="max-w-md mx-auto">
                        <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No {tab !== 'all' ? tab : ''} listings yet</h3>
                        <p className="text-muted-foreground mb-6">
                          {tab === 'all'
                            ? "Start building your portfolio by creating your first listing."
                            : `You don't have any ${tab} listings yet.`
                          }
                        </p>
                        <Button asChild>
                          <Link href="/agent/listings/new">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Your First Listing
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}