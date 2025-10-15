// Register new user (via Supabase)
import { supabase } from "@/lib/supabaseClient";
import { AuthSignupSchema } from "@/lib/validation";
import { success, error } from "@/lib/responses";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = AuthSignupSchema.parse(body);

    const { email, password, full_name, phone, role } = parsed;

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          phone,
          role: role || "owner",
        },
      },
    });

    if (signUpError) return error(signUpError.message, 400);

    // optional: add user to 'profiles' table
    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email: data.user.email,
        full_name,
        phone,
        role: role || "owner",
      });
    }

    return success(
      { message: "Signup successful. Please check your email to confirm." },
      201
    );
  } catch (err: any) {
    return error(err.message || "Invalid signup data", 400);
  }
}
