import { supabase } from "@/lib/supabaseClient";
import { success, error } from "@/lib/responses";

export async function GET() {
  try {
    const { data, error: dbError } = await supabase
      .from("profiles")
      .select("role");

    if (dbError) throw dbError;

    const total = data.length;
    const roleCounts: Record<string, number> = {};

    data.forEach((u) => {
      const role = u.role || "user";
      roleCounts[role] = (roleCounts[role] || 0) + 1;
    });

    return success({
      total,
      by_role: Object.entries(roleCounts).map(([role, count]) => ({
        role,
        count,
      })),
    });
  } catch (err: any) {
    return error(err.message, 500);
  }
}
