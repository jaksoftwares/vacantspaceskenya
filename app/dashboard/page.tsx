'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function UserDashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (profile && profile.role !== 'user') {
      // Redirect non-users to their appropriate dashboards
      if (profile.role === 'admin') {
        router.push('/admin/admin');
      } else if (profile.role === 'agent') {
        router.push('/agent/agent');
      }
    } else if (user) {
      fetchData();
    }
  }, [user, profile, authLoading, router]);

  const fetchData = async () => {
    if (!user) return;

    const [favoritesData, inquiriesData] = await Promise.all([
      supabase
        .from('favorites')
        .select(`
          *,
          listings(
            id,
            title,
            price,
            price_frequency,
            listing_images(url, is_primary),
            counties(name)
          )
        `)
        .eq('user_id', user.id)
        .limit(5),
      supabase
        .from('inquiries')
        .select(`
          *,
          listings(
            id,
            title,
            price,
            listing_images(url, is_primary)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)
    ]);

    if (favoritesData.data) setFavorites(favoritesData.data);
    if (inquiriesData.data) setInquiries(inquiriesData.data);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {profile?.full_name}!</h1>
          <p className="text-muted-foreground">Your personal dashboard for finding the perfect space</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorites</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{favorites.length}</div>
              <p className="text-xs text-muted-foreground">Saved listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inquiries.length}</div>
              <p className="text-xs text-muted-foreground">Sent inquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Searches</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Saved searches</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Favorites</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/favorites">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No favorites yet</p>
                  <Button asChild>
                    <Link href="/browse">Browse Listings</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {favorites.map((fav) => (
                    <Link
                      key={fav.id}
                      href={`/listings/${fav.listings.id}`}
                      className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-20 h-20 bg-slate-200 rounded-lg overflow-hidden shrink-0">
                        {fav.listings.listing_images?.[0]?.url && (
                          <img
                            src={fav.listings.listing_images[0].url}
                            alt={fav.listings.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{fav.listings.title}</h4>
                        <p className="text-sm text-muted-foreground">{fav.listings.counties?.name}</p>
                        <p className="text-lg font-bold text-primary mt-1">
                          KES {fav.listings.price.toLocaleString()}
                          <span className="text-xs text-muted-foreground">/{fav.listings.price_frequency}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Inquiries</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/inquiries">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {inquiries.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No inquiries yet</p>
                  <Button asChild>
                    <Link href="/browse">Browse Listings</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-20 h-20 bg-slate-200 rounded-lg overflow-hidden shrink-0">
                        {inquiry.listings.listing_images?.[0]?.url && (
                          <img
                            src={inquiry.listings.listing_images[0].url}
                            alt={inquiry.listings.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{inquiry.listings.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{inquiry.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            inquiry.status === 'new' ? 'bg-blue-100 text-blue-700' :
                            inquiry.status === 'read' ? 'bg-gray-100 text-gray-700' :
                            inquiry.status === 'responded' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {inquiry.status}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(inquiry.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-to-r from-primary to-slate-800 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Start Your Search Today</h3>
                <p className="text-gray-200 mb-4">
                  Discover thousands of vacant spaces across Kenya
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/browse">
                    <Search className="mr-2 h-4 w-4" />
                    Browse All Listings
                  </Link>
                </Button>
              </div>
              <TrendingUp className="h-24 w-24 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}