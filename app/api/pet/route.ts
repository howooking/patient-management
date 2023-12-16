import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    name,
    hospitalPetId,
    species,
    breed,
    gender,
    birth,
    color,
    microchipNumber,
    memo,
    hospitalId,
  } = await request.json();

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: "session error" }, { status: 401 });
  }

  if (
    !name &&
    !hospitalPetId &&
    !species &&
    !breed &&
    !gender &&
    !birth &&
    !hospitalId
  ) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }

  const { data: pet, error: petError } = await supabase
    .from("pets")
    .insert({
      hos_pet_id: hospitalPetId,
      hos_id: hospitalId,
      birth,
      species,
      breed,
      gender,
      name,
      color,
      memo,
      microchip_no: microchipNumber,
    })
    .select()
    .single();

  if (petError) {
    return NextResponse.json({ error: petError.message }, { status: 500 });
  }

  return NextResponse.json(
    { success: "successfully inserted pet", pet },
    { status: 200 }
  );
}

export async function PUT(request: NextRequest) {
  const {
    name,
    hospitalPetId,
    species,
    breed,
    gender,
    birth,
    color,
    microchipNumber,
    memo,
    hospitalId,
    petId,
  } = await request.json();

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: "session error" }, { status: 401 });
  }

  if (
    !name &&
    !hospitalPetId &&
    !species &&
    !breed &&
    !gender &&
    !birth &&
    !hospitalId
  ) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }

  const { data: pet, error: petError } = await supabase
    .from("pets")
    .update({
      hos_pet_id: hospitalPetId,
      birth,
      species,
      breed,
      gender,
      name,
      color,
      memo,
      microchip_no: microchipNumber,
    })
    .match({ pet_id: petId })
    .select()
    .single();

  if (petError) {
    return NextResponse.json({ error: petError.message }, { status: 500 });
  }

  return NextResponse.json(
    { success: "successfully updated pet", pet },
    { status: 200 }
  );
}
