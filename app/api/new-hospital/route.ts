import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, type, businessNumber, address, phoneNumber } =
    await request.json();

  if (!name) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }

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

  // 가상병원
  if (type === "virtual") {
    const { data: hospital, error: hospitalError } = await supabase
      .from("hospitals")
      .insert({
        business_no: id,
        business_approved: true,
        master_id: id,
        name,
        personal: true,
      })
      .select("hos_id")
      .single();

    if (hospitalError) {
      return NextResponse.json(
        { error: "error while inserting hopitals table" },
        { status: 500 }
      );
    }

    const hospitalId = hospital.hos_id;

    const { error: mappingError } = await supabase
      .from("hos_vet_mapping")
      .insert({
        hos_id: hospitalId,
        vet_id: id,
        vet_approved: true,
      });

    if (mappingError) {
      return NextResponse.json(
        { error: "primary key confliction on hos_vet_mapping table" },
        { status: 409 }
      );
    }

    const { error: defaultHosError } = await supabase
      .from("vets")
      .update({ default_hos_id: hospitalId })
      .eq("vet_id", id)
      .is("default_hos_id", null);

    if (defaultHosError) {
      return NextResponse.json(
        { error: "error while inserting default_hos_id" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: "successfully inserted hospital", hospitalId },
      { status: 200 }
    );
  }

  // 실제병원
  if (type === "real") {
    console.log(1);

    const { data: hospital, error: hospitalError } = await supabase
      .from("hospitals")
      .insert({
        business_no: businessNumber,
        master_id: id,
        name,
        address,
        phone_no: phoneNumber,
      })
      .select("hos_id")
      .single();

    if (hospitalError) {
      return NextResponse.json(
        { error: "error while inserting hopitals table" },
        { status: 500 }
      );
    }

    const hospitalId = hospital.hos_id;

    const { error: mappingError } = await supabase
      .from("hos_vet_mapping")
      .insert({
        hos_id: hospitalId,
        vet_id: id,
        vet_approved: true,
      });

    if (mappingError) {
      return NextResponse.json(
        { error: "error in hos_vet_mapping table" },
        { status: 500 }
      );
    }
    console.log(3);
    const { error: defaultHosError } = await supabase
      .from("vets")
      .update({ default_hos_id: hospitalId })
      .eq("vet_id", id)
      .is("default_hos_id", null);

    if (defaultHosError) {
      return NextResponse.json(
        { error: "error while inserting default_hos_id" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: "successfully inserted hospital", hospitalId },
      { status: 200 }
    );
  }
}