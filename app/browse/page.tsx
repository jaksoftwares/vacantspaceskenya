'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, MapPin, Filter, Heart, Square, Star, Layers3, Map, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

const MapView = dynamic(() => import('./components/MapView'), { ssr: false });

export default function BrowsePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [counties, setCounties] = useState<any[]>([]);
  const [amenities, setAmenities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    county: 'all',
    price: [0, 500000],
    size: [0, 1000],
    verified: false,
    ownerType: 'all',
    amenities: [] as string[],
  });

  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [listingsData, categoriesData, countiesData, amenitiesData] = await Promise.all([
      supabase
        .from('listings')
        .select(`
          *,
          categories(name),
          counties(name),
          listing_images(url, is_primary)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(200),
      supabase.from('categories').select('*').is('parent_id', null),
      supabase.from('counties').select('*').order('name'),
      supabase.from('amenities').select('*'),
    ]);

    setListings(listingsData.data || []);
    setCategories(categoriesData.data || []);
    setCounties(countiesData.data || []);
    setAmenities(amenitiesData.data || []);
    setLoading(false);
  };

  const filteredListings = listings.filter((l) => {
    const matchSearch =
      l.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      l.description?.toLowerCase().includes(filters.search.toLowerCase());
    const matchCategory = filters.category === 'all' || l.category_id === filters.category;
    const matchCounty = filters.county === 'all' || l.county_id === filters.county;
    const matchPrice = l.price >= filters.price[0] && l.price <= filters.price[1];
    const matchSize = !l.size_sqm || (l.size_sqm >= filters.size[0] && l.size_sqm <= filters.size[1]);
    const matchVerified = !filters.verified || l.verification_status === 'verified';
    const matchOwner =
      filters.ownerType === 'all' || l.listing_type === filters.ownerType;
    const matchAmenities =
      filters.amenities.length === 0 ||
      filters.amenities.every((a) => l.amenities?.includes(a));
    return matchSearch && matchCategory && matchCounty && matchPrice && matchSize && matchVerified && matchOwner && matchAmenities;
  });

  const getPrimaryImage = (l: any) =>
    l.listing_images?.find((img: any) => img.is_primary)?.url ||
    l.listing_images?.[0]?.url ||
    '/placeholder.jpg';

  const resetFilters = () =>
    setFilters({
      search: '',
      category: 'all',
      county: 'all',
      price: [0, 500000],
      size: [0, 1000],
      verified: false,
      ownerType: 'all',
      amenities: [],
    });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6 flex-1">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <div>
            <h1 className="text-3xl font-bold">Discover Vacant Spaces</h1>
            <p className="text-muted-foreground">
              Explore {filteredListings.length}+ available spaces across Kenya
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="price-low">Price: Low → High</SelectItem>
                <SelectItem value="price-high">Price: High → Low</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setView(view === 'grid' ? 'map' : 'grid')}>
              {view === 'grid' ? (
                <>
                  <Map className="h-4 w-4 mr-2" /> Map View
                </>
              ) : (
                <>
                  <Layers3 className="h-4 w-4 mr-2" /> Grid View
                </>
              )}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <FiltersContent {...{ filters, setFilters, resetFilters, categories, counties, amenities }} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-80 shrink-0">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <FiltersContent {...{ filters, setFilters, resetFilters, categories, counties, amenities }} />
              </CardContent>
            </Card>
          </div>

          {/* Listings / Map */}
          <div className="flex-1">
            {view === 'map' ? (
              <MapView listings={filteredListings} />
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                  [...Array(6)].map((_, i) => (
                    <Card key={i} className="overflow-hidden animate-pulse h-72" />
                  ))
                ) : filteredListings.length === 0 ? (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">No listings found.</p>
                    <Button onClick={resetFilters} className="mt-4">Reset Filters</Button>
                  </Card>
                ) : (
                  filteredListings.map((l) => (
                    <Link key={l.id} href={`/listings/${l.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-all group">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={getPrimaryImage(l)}
                            alt={l.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                          <Button size="icon" variant="secondary" className="absolute top-2 right-2 rounded-full">
                            <Heart className="h-4 w-4" />
                          </Button>
                          {l.featured && <Badge className="absolute top-2 left-2">Featured</Badge>}
                          {l.verification_status === 'verified' && (
                            <Badge className="absolute bottom-2 left-2 bg-green-600">Verified</Badge>
                          )}
                        </div>
                        <CardContent className="p-4 space-y-1">
                          <h3 className="font-semibold text-lg line-clamp-1">{l.title}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {l.counties?.name}, {l.town}
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-primary font-bold text-xl">KES {l.price.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">/ {l.price_frequency}</p>
                            </div>
                            {l.size_sqm && (
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Square className="h-3 w-3 mr-1" /> {l.size_sqm} m²
                              </div>
                            )}
                          </div>
                          {l.avg_rating && (
                            <div className="flex items-center gap-1 text-sm mt-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              {l.avg_rating.toFixed(1)} ({l.reviews_count})
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function FiltersContent({
  filters,
  setFilters,
  resetFilters,
  categories,
  counties,
  amenities,
}: any) {
  const toggleAmenity = (a: string) => {
    setFilters({
      ...filters,
      amenities: filters.amenities.includes(a)
        ? filters.amenities.filter((x: string) => x !== a)
        : [...filters.amenities, a],
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-9"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={filters.category} onValueChange={(v) => setFilters({ ...filters, category: v })}>
          <SelectTrigger><SelectValue placeholder="All Categories" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((c: any) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>County</Label>
        <Select value={filters.county} onValueChange={(v) => setFilters({ ...filters, county: v })}>
          <SelectTrigger><SelectValue placeholder="All Counties" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {counties.map((c: any) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Price Range (KES)</Label>
        <Slider min={0} max={500000} step={1000} value={filters.price} onValueChange={(v) => setFilters({ ...filters, price: v })} />
        <p className="text-sm text-muted-foreground">{filters.price[0].toLocaleString()} - {filters.price[1].toLocaleString()}</p>
      </div>

      <div className="space-y-2">
        <Label>Size (m²)</Label>
        <Slider min={0} max={1000} step={10} value={filters.size} onValueChange={(v) => setFilters({ ...filters, size: v })} />
      </div>

      <div className="space-y-3">
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 gap-2">
          {amenities.map((a: any) => (
            <div key={a.id} className="flex items-center space-x-2">
              <Checkbox
                id={a.id}
                checked={filters.amenities.includes(a.slug)}
                onCheckedChange={() => toggleAmenity(a.slug)}
              />
              <label htmlFor={a.id} className="text-sm cursor-pointer">{a.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label>Verified Only</Label>
        <Checkbox
          checked={filters.verified}
          onCheckedChange={(v) => setFilters({ ...filters, verified: !!v })}
        />
      </div>

      <div className="space-y-2">
        <Label>Listing Type</Label>
        <Select value={filters.ownerType} onValueChange={(v) => setFilters({ ...filters, ownerType: v })}>
          <SelectTrigger><SelectValue placeholder="All Types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="agent">Agent</SelectItem>
            <SelectItem value="developer">Developer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full" variant="outline" onClick={resetFilters}>
        <X className="h-4 w-4 mr-2" /> Clear Filters
      </Button>
    </div>
  );
}
