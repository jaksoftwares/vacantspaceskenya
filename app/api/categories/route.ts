// GET all / POST new category
import { supabase } from "@/lib/supabaseClient";
import { CategorySchema } from "@/lib/validation";
import { success, error } from "@/lib/responses";

export async function GET() {
  const { data, error: dbError } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (dbError) return error(dbError.message, 500);
  return success(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CategorySchema.parse(body);

    const { data, error: insertError } = await supabase
      .from("categories")
      .insert(parsed)
      .select()
      .single();

    if (insertError) return error(insertError.message, 500);
    return success(data, 201);
  } catch (err: any) {
    return error(err.message || "Invalid input", 400);
  }
}
