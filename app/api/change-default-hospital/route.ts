import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const { hospitalId } = await request.json();

  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (!session || sessionError) {
    return NextResponse.json({ error: "session error" }, { status: 401 });
  }

  const {
    user: { id },
  } = session;

  if (!hospitalId) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }

  const { error: vetError } = await supabase
    .from("vets")
    .update({ default_hos_id: hospitalId })
    .match({ vet_id: id });

  if (vetError) {
    return NextResponse.json({ error: vetError.message }, { status: 500 });
  }

  return NextResponse.json(
    { success: "successfully inserted hospital", hospitalId },
    { status: 200 }
  );
}
