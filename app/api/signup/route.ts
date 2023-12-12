import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const { vetName, licenseNumber } = await request.json();

  if (!vetName || !licenseNumber) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || !userError) {
    return NextResponse.json({ error: "session error" }, { status: 401 });
  }

  const { user_metadata, id, email } = user;

  const { error } = await supabase.from("vets").insert({
    vet_id: id,
    vet_email: email as string,
    vet_name: vetName,
    license_no: licenseNumber,
    license_approved: false,
    avatar_url: user_metadata.avatar_url,
  });

  if (error) {
    return NextResponse.json(
      { error: `postgres error, ${error.message}` },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { success: "successfully inserted vet instance" },
    { status: 200 }
  );
}
