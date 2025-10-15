'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Zap,
  Droplet,
  Shield,
  CheckCircle,
  Star,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Home,
  Building,
  Eye
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import Image from 'next/image';

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [listing, setListing] = useState<any>(null);
  const [agent, setAgent] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [amenities, setAmenities] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    if (params?.id) {
      fetchListing();
      incrementViews();
      if (user) {
        checkFavorite();
      }
    }
  }, [params?.id, user]);

  const fetchListing = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        categories(id, name, slug),
        counties(id, name),
        constituencies(id, name),
        listing_images(id, url, caption, is_primary, sort_order),
        listing_amenities(amenities(id, name, icon)),
        profiles!listings_user_id_fkey(id, full_name, email, phone, avatar_url, agency_name, verified_id, verified_phone)
      `)
      .eq('id', params?.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching listing:', error);
      toast.error('Failed to load listing');
      router.push('/browse');
      return;
    }

    if (!data) {
      toast.error('Listing not found');
      router.push('/browse');
      return;
    }

    setListing(data);
    setAgent(data.profiles);
    setImages(data.listing_images?.sort((a: any, b: any) => a.sort_order - b.sort_order) || []);
    setAmenities(data.listing_amenities?.map((la: any) => la.amenities) || []);

    const { data: reviewsData } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles(full_name, avatar_url)
      `)
      .eq('listing_id', params?.id)
      .order('created_at', { ascending: false });

    if (reviewsData) {
      setReviews(reviewsData);
    }

    setLoading(false);
  };

  const incrementViews = async () => {
    await supabase.rpc('increment_listing_views', { listing_id: params?.id });
  };

  const checkFavorite = async () => {
    const { data } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user?.id)
      .eq('listing_id', params?.id)
      .maybeSingle();

    setIsFavorite(!!data);
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast.error('Please sign in to save favorites');
      router.push('/login');
      return;
    }

    if (isFavorite) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('listing_id', params?.id);
      setIsFavorite(false);
      toast.success('Removed from favorites');
    } else {
      await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          listing_id: params?.id
        });
      setIsFavorite(true);
      toast.success('Added to favorites');
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('inquiries')
      .insert({
        listing_id: params?.id,
        user_id: user?.id || null,
        ...inquiryForm
      });

    if (error) {
      toast.error('Failed to send inquiry');
    } else {
      toast.success('Inquiry sent successfully!');
      setInquiryForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Link href="/">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/browse">Browse</Link>
            <span className="mx-2">/</span>
            <span>{listing.title}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative">
              <div className="relative h-[500px] bg-slate-200 rounded-xl overflow-hidden">
                {images.length > 0 ? (
                  <Image
                    src={images[selectedImage]?.url || '/placeholder.jpg'}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Home className="h-24 w-24 text-slate-400" />
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {images.slice(0, 5).map((img: any, idx: number) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative h-24 rounded-lg overflow-hidden border-2 ${
                        selectedImage === idx ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <Image src={img.url} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{listing.categories?.name}</Badge>
                      {listing.verification_status === 'verified' && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {listing.featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>
                        {listing.constituencies?.name}, {listing.counties?.name}
                        {listing.town && ` • ${listing.town}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={toggleFavorite}>
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    KES {listing.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-muted-foreground">/ {listing.price_frequency}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y">
                  {listing.size_sqm && (
                    <div className="flex items-center gap-2">
                      <Square className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Area</div>
                        <div className="font-semibold">{listing.size_sqm} m²</div>
                      </div>
                    </div>
                  )}
                  {listing.number_of_rooms && (
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Rooms</div>
                        <div className="font-semibold">{listing.number_of_rooms}</div>
                      </div>
                    </div>
                  )}
                  {listing.parking_spaces && (
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Parking</div>
                        <div className="font-semibold">{listing.parking_spaces}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Views</div>
                      <div className="font-semibold">{listing.views_count}</div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="description" className="mt-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="space-y-4 pt-4">
                    <div>
                      <h3 className="font-semibold mb-2">About This Space</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{listing.description}</p>
                    </div>
                    {listing.nearby_landmarks && (
                      <div>
                        <h3 className="font-semibold mb-2">Nearby Landmarks</h3>
                        <p className="text-muted-foreground">{listing.nearby_landmarks}</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="amenities" className="pt-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {listing.has_electricity && (
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <span>Electricity</span>
                        </div>
                      )}
                      {listing.has_water && (
                        <div className="flex items-center gap-2">
                          <Droplet className="h-4 w-4 text-primary" />
                          <span>Water Supply</span>
                        </div>
                      )}
                      {listing.has_internet && (
                        <div className="flex items-center gap-2">
                          <Wifi className="h-4 w-4 text-primary" />
                          <span>Internet</span>
                        </div>
                      )}
                      {listing.has_security && (
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          <span>Security</span>
                        </div>
                      )}
                      {listing.has_parking && (
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-primary" />
                          <span>Parking</span>
                        </div>
                      )}
                      {amenities.map((amenity: any) => (
                        <div key={amenity.id} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Listing Type</div>
                        <div className="font-medium capitalize">{listing.listing_type}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Status</div>
                        <div className="font-medium capitalize">{listing.status}</div>
                      </div>
                      {listing.available_from && (
                        <div>
                          <div className="text-sm text-muted-foreground">Available From</div>
                          <div className="font-medium">{new Date(listing.available_from).toLocaleDateString()}</div>
                        </div>
                      )}
                      {listing.min_lease_period && (
                        <div>
                          <div className="text-sm text-muted-foreground">Min. Lease</div>
                          <div className="font-medium">{listing.min_lease_period}</div>
                        </div>
                      )}
                      {listing.deposit_amount && (
                        <div>
                          <div className="text-sm text-muted-foreground">Deposit</div>
                          <div className="font-medium">KES {listing.deposit_amount.toLocaleString()}</div>
                        </div>
                      )}
                      {listing.floor_level && (
                        <div>
                          <div className="text-sm text-muted-foreground">Floor Level</div>
                          <div className="font-medium">{listing.floor_level}</div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {reviews.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Reviews ({reviews.length})</h3>
                  <div className="space-y-4">
                    {reviews.map((review: any) => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={review.profiles?.avatar_url} />
                            <AvatarFallback>{review.profiles?.full_name?.[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="font-semibold">{review.profiles?.full_name}</div>
                              <div className="flex items-center gap-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                            <div className="text-xs text-muted-foreground mt-1">
                              {new Date(review.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Contact Agent</h3>

                <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={agent?.avatar_url} />
                    <AvatarFallback>{agent?.full_name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{agent?.full_name}</div>
                    {agent?.agency_name && (
                      <div className="text-sm text-muted-foreground">{agent.agency_name}</div>
                    )}
                    {agent?.verified_id && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="I'm interested in this space..."
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Send Inquiry</Button>
                </form>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <a href={`tel:${listing.contact_phone}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      {listing.contact_phone}
                    </Button>
                  </a>
                  {listing.contact_email && (
                    <a href={`mailto:${listing.contact_email}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Agent
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Link({ href, children, className }: any) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}