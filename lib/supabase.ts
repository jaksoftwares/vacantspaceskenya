import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: 'user' | 'agent' | 'admin';
  avatar_url: string | null;
  verified_phone: boolean;
  verified_id: boolean;
  agency_name: string | null;
  agency_license: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  description: string | null;
  icon: string | null;
  sort_order: number;
  created_at: string;
};

export type County = {
  id: string;
  name: string;
  code: string | null;
  created_at: string;
};

export type Constituency = {
  id: string;
  county_id: string;
  name: string;
  created_at: string;
};

export type Listing = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category_id: string;
  county_id: string;
  constituency_id: string | null;
  town: string | null;
  neighborhood: string | null;
  street_address: string | null;
  latitude: number | null;
  longitude: number | null;
  nearby_landmarks: string | null;
  price: number;
  currency: string;
  price_frequency: string;
  deposit_amount: number | null;
  service_charge: number | null;
  other_fees: string | null;
  size_sqm: number | null;
  size_sqft: number | null;
  number_of_rooms: number | null;
  floor_level: string | null;
  furnished: boolean;
  available_from: string | null;
  available_to: string | null;
  min_lease_period: string | null;
  max_lease_period: string | null;
  lease_terms: string | null;
  zoning: string | null;
  permitted_uses: string[] | null;
  restrictions: string[] | null;
  road_access: string | null;
  public_transport_distance: string | null;
  has_parking: boolean;
  parking_spaces: number | null;
  has_security: boolean;
  security_features: string[] | null;
  disabled_access: boolean;
  has_electricity: boolean;
  has_water: boolean;
  has_internet: boolean;
  has_ac: boolean;
  listing_type: string;
  verification_status: string;
  onsite_verified: boolean;
  status: string;
  contact_name: string | null;
  contact_phone: string;
  contact_email: string | null;
  preferred_contact_hours: string | null;
  has_title_deed: boolean;
  has_occupation_cert: boolean;
  has_building_plan: boolean;
  views_count: number;
  inquiries_count: number;
  avg_rating: number | null;
  reviews_count: number;
  featured: boolean;
  featured_until: string | null;
  created_at: string;
  updated_at: string;
};

export type ListingImage = {
  id: string;
  listing_id: string;
  url: string;
  caption: string | null;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
};

export type Amenity = {
  id: string;
  name: string;
  icon: string | null;
  category: string | null;
  created_at: string;
};

export type Review = {
  id: string;
  listing_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  helpful_count: number;
  created_at: string;
  updated_at: string;
};

export type Inquiry = {
  id: string;
  listing_id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
};