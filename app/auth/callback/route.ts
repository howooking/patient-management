import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(
      code
    );

    if (sessionError) {
      return NextResponse.redirect(`${requestUrl.origin}/auth-error`);
    }

    // RLS : authenticated, auth.uid() = vet_id
    const { data: vet, error: vetError } = await supabase
      .from("vets")
      .select("default_hos_id")
      .single();

    if (vetError) {
      // 회원이 아닌 경우 vetError.code === "PGRST116"가 발생
      if (vetError.code !== "PGRST116")
        return NextResponse.redirect(`${requestUrl.origin}/auth-error`);
    }

    // 회원이 아닌경우, vet === null
    if (!vet) {
      return NextResponse.redirect(`${requestUrl.origin}/signup`);
    }

    // 기본 병원 설정이 안된 경우, vet.default_hos_id === null
    if (!vet.default_hos_id) {
      return NextResponse.redirect(`${requestUrl.origin}/new-hospital`);
    }

    // 기본 병원 설정이 된 경우, vet.default_hos_id !== null
    return NextResponse.redirect(
      `${requestUrl.origin}/hospital/${vet.default_hos_id}`
    );
  }
}
