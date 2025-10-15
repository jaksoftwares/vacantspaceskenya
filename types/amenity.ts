// Type definitions for amenities
export interface Amenity {
  id: string;
  name: string;
  icon?: string | null;
  category?: string | null; // e.g. "Utilities", "Security", "Leisure"
  created_at?: string;
}