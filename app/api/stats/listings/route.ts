import { supabase } from "@/lib/supabaseClient";
import { success, error } from "@/lib/responses";

interface ListingCategory {
  category_id: string | null;
  categories?: { name: string }[] | null;
}

interface ListingLocation {
  location_id: string | null;
  locations?: { name: string }[] | null;
}

export async function GET() {
  try {
    // Total listings
    const { count: total, error: totalErr } = await supabase
      .from("listings")
      .select("*", { count: "exact", head: true });
    if (totalErr) throw totalErr;

    // Count by category
    const { data: byCategory, error: catErr } = await supabase
      .from("listings")
      .select("category_id, categories(name)")
      .neq("category_id", null);

    if (catErr) throw catErr;

    const categoryCounts: Record<string, number> = {};

    (byCategory as ListingCategory[] | null)?.forEach((item) => {
      const cat =
        item.categories?.[0]?.name?.trim() || "Uncategorized";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    // Count by location
    const { data: byLocation, error: locErr } = await supabase
      .from("listings")
      .select("location_id, locations(name)");
    if (locErr) throw locErr;

    const locationCounts: Record<string, number> = {};

    (byLocation as ListingLocation[] | null)?.forEach((item) => {
      const loc =
        item.locations?.[0]?.name?.trim() || "Unspecified";
      locationCounts[loc] = (locationCounts[loc] || 0) + 1;
    });

    return success({
      total,
      by_category: Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count,
      })),
      by_location: Object.entries(locationCounts).map(([location, count]) => ({
        location,
        count,
      })),
    });
  } catch (err: any) {
    return error(err.message, 500);
  }
}
