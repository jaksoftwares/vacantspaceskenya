// Type definitions for categories
export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string | null;
  description?: string | null;
  icon?: string | null;
  sort_order?: number;
  created_at?: string;
}
