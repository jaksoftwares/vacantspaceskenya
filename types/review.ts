// Type definitions for reviews
export interface Review {
  id: string;
  listing_id: string;
  user_id: string;
  rating: number; // 1–5 stars
  comment?: string;
  created_at?: string;
  updated_at?: string;
  user?: {
    id: string;
    full_name?: string;
    avatar_url?: string;
  };
}