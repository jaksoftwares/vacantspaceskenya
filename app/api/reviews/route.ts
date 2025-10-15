// GET all, POST new review
import { supabase } from "@/lib/supabaseClient";
import { ReviewSchema } from "@/lib/validation";
import { success, error } from "@/lib/responses";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get("listing_id");

  let query = supabase
    .from("reviews")
    .select("*, profiles(full_name, avatar_url)")
    .order("created_at", { ascending: false });

  if (listingId) query = query.eq("listing_id", listingId);

  const { data, error: dbError } = await query;

  if (dbError) return error(dbError.message, 500);
  return success(data);
}

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return error("Unauthorized", 401);

    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData.user) return error("Unauthorized", 401);

    const body = await req.json();
    const parsed = ReviewSchema.parse(body);

    // Prevent duplicate reviews for same listing by same user
    const { data: existing } = await supabase
      .from("reviews")
      .select("id")
      .eq("listing_id", parsed.listing_id)
      .eq("user_id", authData.user.id)
      .maybeSingle();

    if (existing) return error("You have already reviewed this listing", 400);

    const { data, error: insertError } = await supabase
      .from("reviews")
      .insert({
        ...parsed,
        user_id: authData.user.id,
      })
      .select()
      .single();

    if (insertError) return error(insertError.message, 500);
    return success(data, 201);
  } catch (err: any) {
    return error(err.message, 400);
  }
}
