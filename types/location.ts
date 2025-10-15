// Type definitions for locations
export type LocationType = "county" | "constituency" | "town" | "neighborhood";

export interface Location {
  id: string;
  name: string;
  slug: string;
  type: LocationType;
  parent_id?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  created_at?: string;
  updated_at?: string;
}