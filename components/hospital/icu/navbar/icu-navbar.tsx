import { createSupabaseServerClient } from "@/lib/supabase/server";
import IcuPatientSelectDialog from "../add-dialog/icu-patient-select-dialog";
import GroupFilter from "./group-filter";
import IcuDateSelector from "./icu-date-selector";
import SearchRange from "./search-range";
import VetFilter from "./vet-filter";

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
    <nav className="fixed flex items-center gap-2 z-50 top-3.5 px-2">
      <IcuDateSelector />
      <SearchRange />
      <GroupFilter />
      <VetFilter />
      <IcuPatientSelectDialog pets={pets} />
    </nav>
  );
}
