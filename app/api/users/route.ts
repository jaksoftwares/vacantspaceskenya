// GET all users, POST register
import { supabase } from "@/lib/supabaseClient";
import { UserProfileSchema } from "@/lib/validation";
import { success, error } from "@/lib/responses";

export async function GET() {
  const { data, error: dbError } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (dbError) return error(dbError.message, 500);
  return success(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = UserProfileSchema.parse(body);

    const { data, error: insertError } = await supabase
      .from("profiles")
      .insert(parsed)
      .select()
      .single();

    if (insertError) return error(insertError.message, 500);
    return success(data, 201);
  } catch (err: any) {
    return error(err.message || "Invalid user data", 400);
  }
}
