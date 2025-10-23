'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { PropertyCard } from '@/app/browse/components/PropertyCard';
import {
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  TrendingUp,
  Calendar,
  Building2,
  ArrowLeft,
  Grid3x3,
  List,
  Map
} from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const [category, setCategory] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [counties, setCounties] = useState<any[]>([]);
  const [amenities, setAmenities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [filters, setFilters] = useState({
    search: '',
    county: 'all',
    price: [0, 500000],
    size: [0, 1000],
    verified: false,
    ownerType: 'all',
    amenities: [] as string[],
  });

  const [view, setView] = useState<'grid' | 'list' | 'map'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  const fetchData = async () => {
    const [categoryData, listingsData, countiesData, amenitiesData] = await Promise.all([
      supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .single(),
      supabase
        .from('listings')
        .select(`
          *,
          categories(name, slug),
          counties(name),
          listing_images(url, is_primary),
          listing_amenities(amenities(name, slug))
        `)
        .eq('category_id', categoryId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(200),
      supabase.from('counties').select('*').order('name'),
      supabase.from('amenities').select('*'),
    ]);

    if (categoryData.data) {
      setCategory(categoryData.data);
    }
    setListings(listingsData.data || []);
    setCounties(countiesData.data || []);
    setAmenities(amenitiesData.data || []);
    setLoading(false);
  };

  const filteredListings = listings.filter((l) => {
    const matchSearch =
      l.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      l.description?.toLowerCase().includes(filters.search.toLowerCase());
    const matchCounty = filters.county === 'all' || l.county_id === filters.county;
    const matchPrice = l.price >= filters.price[0] && l.price <= filters.price[1];
    const matchSize = !l.size_sqm || (l.size_sqm >= filters.size[0] && l.size_sqm <= filters.size[1]);
    const matchVerified = !filters.verified || l.verification_status === 'verified';
    const matchOwner = filters.ownerType === 'all' || l.listing_type === filters.ownerType;
    const matchAmenities =
      filters.amenities.length === 0 ||
      filters.amenities.every((a) => l.listing_amenities?.some((la: any) => la.amenities?.slug === a));
    return matchSearch && matchCounty && matchPrice && matchSize && matchVerified && matchOwner && matchAmenities;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'verified':
        return (b.verification_status === 'verified' ? 1 : 0) - (a.verification_status === 'verified' ? 1 : 0);
      case 'rating':
        return (b.avg_rating || 0) - (a.avg_rating || 0);
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const resetFilters = () =>
    setFilters({
      search: '',
      county: 'all',
      price: [0, 500000],
      size: [0, 1000],
      verified: false,
      ownerType: 'all',
      amenities: [],
    });

  const activeFiltersCount = [
    filters.county !== 'all',
    filters.price[0] > 0 || filters.price[1] < 500000,
    filters.size[0] > 0 || filters.size[1] < 1000,
    filters.verified,
    filters.ownerType !== 'all',
    filters.amenities.length > 0
  ].filter(Boolean).length;

  const toggleAmenity = (a: string) => {
    setFilters({
      ...filters,
      amenities: filters.amenities.includes(a)
        ? filters.amenities.filter((x: string) => x !== a)
        : [...filters.amenities, a],
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The category you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/categories">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/categories">
              <Button variant="secondary" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
          </div>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {category.name}
            </h1>
            <p className="text-orange-100 text-lg mb-4">
              {category.description || `Browse ${category.name.toLowerCase()} properties across Kenya`}
            </p>
            <div className="flex items-center gap-6 text-orange-100">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <span className="font-semibold">{sortedListings.length}</span>
                <span>properties found</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1 max-w-7xl">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder={`Search ${category.name.toLowerCase()} properties...`}
                className="pl-12 h-12 border-0 focus-visible:ring-0 text-base bg-gray-50"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <Select value={filters.county} onValueChange={(v) => setFilters({ ...filters, county: v })}>
              <SelectTrigger className="md:w-48 h-12 border-0 bg-gray-50">
                <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                <SelectValue placeholder="All Counties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Counties</SelectItem>
                {counties.map((c: any) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-orange-500">{activeFiltersCount}</Badge>
              )}
            </Button>

            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{sortedListings.length}</span> properties found
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-52">
                <TrendingUp className="h-4 w-4 mr-2 text-orange-500" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Most Recent
                  </div>
                </SelectItem>
                <SelectItem value="price-low">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Price: Low to High
                  </div>
                </SelectItem>
                <SelectItem value="price-high">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 rotate-180" />
                    Price: High to Low
                  </div>
                </SelectItem>
                <SelectItem value="rating">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    Highest Rated
                  </div>
                </SelectItem>
                <SelectItem value="verified">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    Verified First
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggles */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
              <Button
                variant={view === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('grid')}
                className={view === 'grid' ? 'bg-white shadow-sm' : ''}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('list')}
                className={view === 'list' ? 'bg-white shadow-sm' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('map')}
                className={view === 'map' ? 'bg-white shadow-sm' : ''}
              >
                <Map className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden relative">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 bg-orange-500">{activeFiltersCount}</Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto w-[340px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Advanced Filters
                  </SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <FiltersContent
                    filters={filters}
                    setFilters={setFilters}
                    resetFilters={resetFilters}
                    counties={counties}
                    amenities={amenities}
                    toggleAmenity={toggleAmenity}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="hidden lg:block w-80 shrink-0">
              <Card className="sticky top-24 shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <SlidersHorizontal className="h-5 w-5 text-orange-500" />
                      Filters
                    </h3>
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        {activeFiltersCount} active
                      </Badge>
                    )}
                  </div>
                  <FiltersContent
                    filters={filters}
                    setFilters={setFilters}
                    resetFilters={resetFilters}
                    counties={counties}
                    amenities={amenities}
                    toggleAmenity={toggleAmenity}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Listings */}
          <div className="flex-1">
            {view === 'list' ? (
              <div className="space-y-4">
                {sortedListings.length === 0 ? (
                  <Card className="p-16 text-center">
                    <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button onClick={resetFilters} variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  </Card>
                ) : (
                  sortedListings.map((l) => (
                    <PropertyCard
                      key={l.id}
                      listing={l}
                      isFavorite={favorites.includes(l.id)}
                      onToggleFavorite={toggleFavorite}
                      view="list"
                    />
                  ))
                )}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedListings.length === 0 ? (
                  <div className="col-span-full">
                    <Card className="p-16 text-center">
                      <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                      <p className="text-muted-foreground mb-6">
                        Try adjusting your filters or search criteria
                      </p>
                      <Button onClick={resetFilters} variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Clear All Filters
                      </Button>
                    </Card>
                  </div>
                ) : (
                  sortedListings.map((l) => (
                    <PropertyCard
                      key={l.id}
                      listing={l}
                      isFavorite={favorites.includes(l.id)}
                      onToggleFavorite={toggleFavorite}
                      view="grid"
                    />
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

// Filters Component
function FiltersContent({ filters, setFilters, resetFilters, counties, amenities, toggleAmenity }: any) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          <MapPin className="h-4 w-4 text-orange-500" />
          County
        </Label>
        <Select value={filters.county} onValueChange={(v) => setFilters({ ...filters, county: v })}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="All Counties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Counties</SelectItem>
            {counties.map((c: any) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">Price Range (KES)</Label>
        <Slider
          min={0}
          max={500000}
          step={10000}
          value={filters.price}
          onValueChange={(v) => setFilters({ ...filters, price: v })}
          className="py-4"
        />
        <div className="flex items-center justify-between text-sm">
          <div className="px-3 py-2 bg-orange-50 text-orange-700 rounded-lg font-semibold">
            KES {filters.price[0].toLocaleString()}
          </div>
          <span className="text-muted-foreground">to</span>
          <div className="px-3 py-2 bg-orange-50 text-orange-700 rounded-lg font-semibold">
            KES {filters.price[1].toLocaleString()}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">Size (m²)</Label>
        <Slider
          min={0}
          max={1000}
          step={50}
          value={filters.size}
          onValueChange={(v) => setFilters({ ...filters, size: v })}
          className="py-4"
        />
        <div className="flex items-center justify-between text-sm">
          <div className="px-3 py-2 bg-gray-100 rounded-lg font-semibold">
            {filters.size[0]} m²
          </div>
          <span className="text-muted-foreground">to</span>
          <div className="px-3 py-2 bg-gray-100 rounded-lg font-semibold">
            {filters.size[1]} m²
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">Listing Type</Label>
        <Select value={filters.ownerType} onValueChange={(v) => setFilters({ ...filters, ownerType: v })}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="owner">Property Owner</SelectItem>
            <SelectItem value="agent">Real Estate Agent</SelectItem>
            <SelectItem value="developer">Developer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border-t pt-4">
        <Label className="text-base font-semibold mb-4 block">Amenities</Label>
        <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto pr-2">
          {amenities.map((a: any) => (
            <div key={a.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Checkbox
                id={a.id}
                checked={filters.amenities.includes(a.slug)}
                onCheckedChange={() => toggleAmenity(a.slug)}
                className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <label
                htmlFor={a.id}
                className="text-sm font-medium cursor-pointer flex-1"
              >
                {a.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <Label htmlFor="verified" className="font-semibold cursor-pointer">
              Verified Listings Only
            </Label>
          </div>
          <Checkbox
            id="verified"
            checked={filters.verified}
            onCheckedChange={(v) => setFilters({ ...filters, verified: !!v })}
            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
          />
        </div>
      </div>

      <Button
        className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 font-semibold h-11"
        onClick={resetFilters}
      >
        <Filter className="h-4 w-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  );
}