import { supabase } from "@/lib/supabaseClient";
import { success, error } from "@/lib/responses";

export async function GET() {
  try {
    const { data, error: dbError } = await supabase
      .from("reviews")
      .select("rating");

    if (dbError) throw dbError;

    const total = data.length;
    const ratingCounts: Record<number, number> = {};

    data.forEach((r) => {
      const rating = r.rating || 0;
      ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    });

    const avg =
      total > 0
        ? data.reduce((sum, r) => sum + (r.rating || 0), 0) / total
        : 0;

    return success({
      total,
      avg_rating: parseFloat(avg.toFixed(2)),
      by_rating: Object.entries(ratingCounts)
        .map(([rating, count]) => ({
          rating: Number(rating),
          count,
        }))
        .sort((a, b) => b.rating - a.rating),
    });
  } catch (err: any) {
    return error(err.message, 500);
  }
}
