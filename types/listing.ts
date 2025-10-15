// Type definitions for property listings
export interface Listing {
  id: string;
  title: string;
  category_id: string;
  subcategory_id?: string | null;
  owner_id: string;
  description?: string | null;
  county: string;
  constituency?: string | null;
  town?: string | null;
  neighborhood?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  price: number;
  currency: string;
  price_type: "monthly" | "daily" | "hourly" | "sale";
  size_sqm?: number | null;
  rooms?: number | null;
  availability_date?: string | null;
  lease_terms?: string | null;
  amenities?: string[] | null;
  zoning?: string | null;
  floor_level?: string | null;
  access?: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
  listing_type: "owner" | "agent" | "developer";
  verification_status?: "unverified" | "phone_verified" | "verified";
  documents?: string[] | null;
  deposit_amount?: number | null;
  restrictions?: string[] | null;
  safety_features?: string[] | null;
  nearby_landmarks?: string[] | null;
  tags?: string[] | null;
  created_at?: string;
  updated_at?: string;
}
