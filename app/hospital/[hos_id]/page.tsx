import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function page({ params }: { params: { hos_id: string } }) {
  const { hos_id } = params;
  const supabase = await createSupabaseServerClient(true);
  const { data: hospital, error: hospitalError } = await supabase
    .from("hospitals")
    .select("*")
    .match({ hos_id })
    .single();

  if (hospitalError) {
    throw new Error(hospitalError.message);
  }

  return <pre>{JSON.stringify(hospital, null, 2)}</pre>;
}
