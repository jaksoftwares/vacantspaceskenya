export interface StatsOverview {
  total_listings: number;
  total_users: number;
  total_reviews: number;
  avg_rating: number;
}

export interface ListingStats {
  total: number;
  by_category: { category: string; count: number }[];
  by_location: { location: string; count: number }[];
}

export interface UserStats {
  total: number;
  by_role: { role: string; count: number }[];
}

export interface ReviewStats {
  total: number;
  avg_rating: number;
  by_rating: { rating: number; count: number }[];
}
