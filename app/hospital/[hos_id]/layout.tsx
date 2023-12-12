import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    hos_id: string;
  };
}) {
  const { hos_id } = params;
  const supabase = await createSupabaseServerClient(true);

  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  const { data: hospitalVetMapping, error: hospitalVetMappingError } =
    await supabase
      .from("hos_vet_mapping")
      .select(
        `
          vet_approved,
          hospitals (
            business_approved
          )
        `
      )
      .match({ hos_id })
      .match({ vet_id: user?.id })
      .single();

  if (hospitalVetMappingError) {
    throw new Error(hospitalVetMappingError.message);
  }

  if (!hospitalVetMapping.hospitals?.business_approved) {
    return (
      <div className="p-2">
        사업자 등록증을 junsgk@gmail.com으로 보내주세요.
      </div>
    );
  }

  if (!hospitalVetMapping.vet_approved) {
    return <div className="p-2">병원 승인 후 참여가 가능합니다.</div>;
  }

  return <>{children}</>;
}
