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
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      { error: "session not existing" },
      { status: 401 }
    );
  }

  const {
    user: { user_metadata, id, email },
  } = session;

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
