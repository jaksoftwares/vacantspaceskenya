'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Plus, Building, Eye, MessageSquare, TrendingUp, CheckCircle } from 'lucide-react';
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
    } else if (profile && profile.role !== 'agent') {
      // Redirect non-agents to their appropriate dashboards
      if (profile.role === 'admin') {
        router.push('/admin/admin');
      } else {
        router.push('/dashboard');
      }
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
    <div className="p-8">
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
  );
}