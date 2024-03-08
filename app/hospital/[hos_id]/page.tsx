import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Suspense } from "react";

export default async function page({ params }: { params: { hos_id: string } }) {
  const { hos_id } = params;

  return (
    <Suspense fallback={<>환자들 로딩</>}>
      <Patients hos_id={hos_id} />
    </Suspense>
  );
}

const Patients = async ({ hos_id }: { hos_id: string }) => {
  const supabase = await createSupabaseServerClient(true);

  const { data: pets, error: petsError } = await supabase
    .from("pets")
    .select()
    .match({ hos_id });

  if (petsError) {
    throw new Error(petsError.message);
  }

  return <pre>{JSON.stringify(pets, null, "\t")}</pre>;
};
