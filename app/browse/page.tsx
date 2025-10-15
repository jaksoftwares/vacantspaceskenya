'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Search, MapPin, Bed, Square, Heart, Star, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function BrowsePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [counties, setCounties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [listingsData, categoriesData, countiesData] = await Promise.all([
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
        .limit(50),
      supabase.from('categories').select('*').is('parent_id', null).order('sort_order'),
      supabase.from('counties').select('*').order('name')
    ]);

    if (listingsData.data) setListings(listingsData.data);
    if (categoriesData.data) setCategories(categoriesData.data);
    if (countiesData.data) setCounties(countiesData.data);
    setLoading(false);
  };

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.category_id === selectedCategory;
    const matchesCounty = selectedCounty === 'all' || listing.county_id === selectedCounty;
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesCounty && matchesPrice;
  });

  const getPrimaryImage = (listing: any) => {
    const primaryImage = listing.listing_images?.find((img: any) => img.is_primary);
    return primaryImage?.url || listing.listing_images?.[0]?.url || '/placeholder.jpg';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse Vacant Spaces</h1>
          <p className="text-muted-foreground">Find your perfect space from {listings.length}+ active listings</p>
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block w-80 shrink-0">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Filters</h3>
                </div>

                <div className="space-y-2">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search listings..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>County</Label>
                  <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Counties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Counties</SelectItem>
                      {counties.map((county) => (
                        <SelectItem key={county.id} value={county.id}>{county.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Price Range (KES)</Label>
                    <span className="text-sm text-muted-foreground">
                      {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={1000000}
                    step={10000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Amenities</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="parking" />
                      <label htmlFor="parking" className="text-sm cursor-pointer">Parking</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="security" />
                      <label htmlFor="security" className="text-sm cursor-pointer">Security</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="electricity" />
                      <label htmlFor="electricity" className="text-sm cursor-pointer">Electricity</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="water" />
                      <label htmlFor="water" className="text-sm cursor-pointer">Water Supply</label>
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedCounty('all');
                  setPriceRange([0, 1000000]);
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <Label>Search</Label>
                        <Input
                          placeholder="Search listings..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <Select defaultValue="recent">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-48 bg-slate-200 animate-pulse" />
                    <CardContent className="p-4 space-y-2">
                      <div className="h-4 bg-slate-200 rounded animate-pulse" />
                      <div className="h-4 bg-slate-200 rounded animate-pulse w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredListings.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No listings found matching your criteria</p>
                <Button className="mt-4" onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedCounty('all');
                }}>
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <Link key={listing.id} href={`/listings/${listing.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full group">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={getPrimaryImage(listing)}
                          alt={listing.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute top-2 right-2 rounded-full"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        {listing.featured && (
                          <Badge className="absolute top-2 left-2" variant="secondary">
                            Featured
                          </Badge>
                        )}
                        {listing.verification_status === 'verified' && (
                          <Badge className="absolute bottom-2 left-2 bg-green-600">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <Badge variant="outline" className="text-xs">
                            {listing.categories?.name}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{listing.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="line-clamp-1">{listing.counties?.name}, {listing.town}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-primary">
                              KES {listing.price.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">per {listing.price_frequency}</p>
                          </div>
                          {listing.size_sqm && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Square className="h-3 w-3" />
                              <span>{listing.size_sqm}m²</span>
                            </div>
                          )}
                        </div>
                        {listing.avg_rating && (
                          <div className="flex items-center gap-1 mt-2 text-sm">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{listing.avg_rating.toFixed(1)}</span>
                            <span className="text-muted-foreground">({listing.reviews_count})</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}