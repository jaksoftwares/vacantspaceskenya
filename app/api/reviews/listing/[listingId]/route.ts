//Fetches all reviews for a specific listing

import { supabase } from "@/lib/supabaseClient";
import { success, error } from "@/lib/responses";

export async function GET(
  _req: Request,
  { params }: { params: { listingId: string } }
) {
  const { data, error: dbError } = await supabase
    .from("reviews")
    .select("*, profiles(full_name, avatar_url)")
    .eq("listing_id", params.listingId)
    .order("created_at", { ascending: false });

  if (dbError) return error(dbError.message, 500);
  return success(data);
}
