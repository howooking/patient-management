import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function page({ params }: { params: { hos_id: string } }) {
  const { hos_id } = params;
  const supabase = await createSupabaseServerClient(true);

  const { data: hospitalVetMapping, error: hospitalVetMappingError } =
    await supabase
      .from("pets")
      .select(
        `
          *
        `
      )
      .match({ hos_id });

  if (hospitalVetMappingError) {
    throw new Error(hospitalVetMappingError.message);
  }

  return (
    <main className="p-2">
      <pre>{JSON.stringify(hospitalVetMapping, null, 2)}</pre>
    </main>
  );
}
