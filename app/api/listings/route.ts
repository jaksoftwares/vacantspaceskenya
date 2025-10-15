// GET (list/filter), POST (create new listing)
import { supabase } from "@/lib/supabaseClient";
import { ListingSchema } from "@/lib/validation";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { success, error } from "@/lib/responses";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category_id = searchParams.get("category_id");
  const county = searchParams.get("county");
  const price_min = searchParams.get("price_min");
  const price_max = searchParams.get("price_max");
  const search = searchParams.get("search");

  let query = supabase.from("listings").select("*");

  if (category_id) query = query.eq("category_id", category_id);
  if (county) query = query.ilike("county", `%${county}%`);
  if (search) query = query.ilike("title", `%${search}%`);
  if (price_min) query = query.gte("price", Number(price_min));
  if (price_max) query = query.lte("price", Number(price_max));

  const { data, error: dbError } = await query.order("created_at", {
    ascending: false,
  });

  if (dbError) return error(dbError.message, 500);
  return success(data);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const images = formData.getAll("images") as File[];

    const json = Object.fromEntries(formData);
    const parsed = ListingSchema.parse(json);

    // Upload images
    const uploadedImages = [];
    for (const file of images) {
      const result: any = await uploadToCloudinary(file);
      uploadedImages.push(result.secure_url);
    }

    const { data, error: insertError } = await supabase
      .from("listings")
      .insert({
        ...parsed,
        images: uploadedImages,
      })
      .select()
      .single();

    if (insertError) return error(insertError.message, 500);
    return success(data, 201);
  } catch (err: any) {
    return error(err.message || "Failed to create listing", 400);
  }
}
