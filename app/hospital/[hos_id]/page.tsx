import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function page({ params }: { params: { hos_id: string } }) {
  const { hos_id } = params;
  const supabase = await createSupabaseServerClient(true);

  const { data: hospitalVetMapping, error: hospitalVetMappingError } =
    await supabase
      .from("hospitals")
      .select(
        `
          *,
          master: vets!hospitals_master_id_fkey (
            *
          )
        `
      )
      .match({ hos_id })
      .single();

  if (hospitalVetMappingError) {
    throw new Error(hospitalVetMappingError.message);
  }

  return (
    <main className="p-2">
      <pre>{JSON.stringify(hospitalVetMapping, null, 2)}</pre>
    </main>
  );
}
