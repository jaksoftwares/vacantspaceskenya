// GET, PUT, DELETE category by ID
import { supabase } from "@/lib/supabaseClient";
import { CategorySchema } from "@/lib/validation";
import { success, error } from "@/lib/responses";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { data, error: dbError } = await supabase
    .from("categories")
    .select("*")
    .eq("id", params.id)
    .single();

  if (dbError) return error(dbError.message, 404);
  return success(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const parsed = CategorySchema.partial().parse(body);

    const { data, error: updateError } = await supabase
      .from("categories")
      .update(parsed)
      .eq("id", params.id)
      .select()
      .single();

    if (updateError) return error(updateError.message, 500);
    return success(data);
  } catch (err: any) {
    return error(err.message, 400);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { error: deleteError } = await supabase
    .from("categories")
    .delete()
    .eq("id", params.id);

  if (deleteError) return error(deleteError.message, 500);
  return success({ message: "Category deleted successfully" });
}
