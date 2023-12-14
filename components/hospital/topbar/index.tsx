import { FaRegBell } from "react-icons/fa6";
import { FaRegStickyNote } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import HospitalSelect from "./hospital-select";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AddPetButton from "./add-pet-button";
import CurrentPage from "./current-page";
import PetDialog from "./pet-dialog";

export default async function TopBar() {
  const supabase = await createSupabaseServerClient(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: vet } = await supabase
    .from("vets")
    .select(
      `
       default_hos_id,
       hos_vet_mapping (
        hospitals (
          hos_id,
          name,
          business_approved
        )
       )
      `
    )
    .match({ vet_id: user?.id })
    .single();

  return (
    <nav className=" bg-background shadow-sm sticky top-0">
      <div className="flex justify-between items-center px-6 py-2">
        <div className="flex items-center gap-4">
          <HospitalSelect
            hospitalList={vet?.hos_vet_mapping}
            defaultHospitalId={vet?.default_hos_id}
          />
          <CurrentPage />
        </div>

        <div className="flex items-center gap-2">
          <PetDialog />

          <PetDialog search />

          <Button size="icon" variant="ghost" className="rounded-full">
            <FaRegStickyNote size={20} />
          </Button>

          <Button size="icon" variant="ghost" className="rounded-full">
            <FaRegBell size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
