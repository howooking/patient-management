import { createSupabaseServerClient } from "@/lib/supabase/server";
import IcuDateSelector from "./icu-date-selector";
import IcuPatientsList from "./icu-patients-list";

export default async function IcuNavbar({ hos_id }: { hos_id: string }) {
  const supabase = await createSupabaseServerClient(true);

  const { data: pets, error: petsError } = await supabase
    .from("pets")
    .select()
    .match({ hos_id });

  if (petsError) {
    throw new Error(petsError.message);
  }

  return (
    <nav className="fixed flex items-center gap-4 bg-white z-50 top-3.5">
      <IcuDateSelector />

      <IcuPatientsList pets={pets} />
    </nav>
  );
}
