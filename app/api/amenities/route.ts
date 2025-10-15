// GET all, POST new
import { supabase } from "@/lib/supabaseClient";
import { AmenitySchema } from "@/lib/validation";
import { success, error } from "@/lib/responses";

// GET all amenities
export async function GET() {
  const { data, error: dbError } = await supabase
    .from("amenities")
    .select("*")
    .order("name", { ascending: true });

  if (dbError) return error(dbError.message, 500);
  return success(data);
}

// POST new amenity (admin only)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = AmenitySchema.parse(body);

    // Optional: verify admin role
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const { data: authData, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authData.user)
      return error("Unauthorized", 401);

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (profile?.role !== "admin") return error("Admins only", 403);

    const { data, error: insertError } = await supabase
      .from("amenities")
      .insert(parsed)
      .select()
      .single();

    if (insertError) return error(insertError.message, 500);
    return success(data, 201);
  } catch (err: any) {
    return error(err.message || "Invalid amenity data", 400);
  }
}
