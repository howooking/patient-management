import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function page({ params }: { params: { hos_id: string } }) {
  const { hos_id } = params;
  const supabase = await createSupabaseServerClient(true);

  const { data: hospitalVetMapping, error: hospitalVetMappingError } =
    await supabase
      .from("hos_vet_mapping")
      .select(
        `
          *,
          vets (
            *
          ),
          hospitals (
            *
          )
        `
      )
      .match({ hos_id })
      .single();

  if (hospitalVetMappingError) {
    throw new Error(hospitalVetMappingError.message);
  }

  if (!hospitalVetMapping.vet_approved) {
    return <>병원 승인 후에 참여가 가능합니다.</>;
  }

  return <pre>{JSON.stringify(hospitalVetMapping, null, 2)}</pre>;
}
