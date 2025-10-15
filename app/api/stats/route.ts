// Platform analytics (listings count, top categories)
import { supabase } from "@/lib/supabaseClient";
import { success, error } from "@/lib/responses";

export async function GET() {
  try {
    // Get total listings
    const { count: total_listings, error: listingsErr } = await supabase
      .from("listings")
      .select("*", { count: "exact", head: true });
    if (listingsErr) throw listingsErr;

    // Get total users
    const { count: total_users, error: usersErr } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });
    if (usersErr) throw usersErr;

    // Get total reviews + average rating
    const { data: reviewsData, error: reviewsErr } = await supabase
      .from("reviews")
      .select("rating");
    if (reviewsErr) throw reviewsErr;

    const total_reviews = reviewsData.length;
    const avg_rating =
      total_reviews > 0
        ? reviewsData.reduce((sum, r) => sum + (r.rating || 0), 0) /
          total_reviews
        : 0;

    return success({
      total_listings,
      total_users,
      total_reviews,
      avg_rating: parseFloat(avg_rating.toFixed(2)),
    });
  } catch (err: any) {
    return error(err.message, 500);
  }
}
