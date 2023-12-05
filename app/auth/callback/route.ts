import { NextResponse } from "next/server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    const { data } = await supabase
      .from("vets")
      .select(`hospitals (hos_id)`)
      .single();

    const defaultHospitalId = data?.hospitals?.hos_id ?? "";

    if (!error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/hospital/${defaultHospitalId}`
      );
    }
  }
  return NextResponse.redirect(`${requestUrl.origin}/auth-error`);
}
