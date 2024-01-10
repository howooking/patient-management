import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function page({ params }: { params: { hos_id: string } }) {
  const { hos_id } = params;
  const supabase = await createSupabaseServerClient(true);

  const { data: pets, error: petsError } = await supabase
    .from("pets")
    .select()
    .match({ hos_id });

  if (petsError) {
    throw new Error(petsError.message);
  }

  return (
    <>
      <pre>{JSON.stringify(pets, null, "\t")}</pre>
    </>
  );
}
