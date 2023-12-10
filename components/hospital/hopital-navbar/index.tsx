import { FaRegBell } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import HospitalSelect from "./hospital-select";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AddPatientButton from "./add-patient-button";

export default async function HospitalNavbar() {
  const supabase = await createSupabaseServerClient(true);

  const { data: vet } = await supabase
    .from("vets")
    .select(
      `vet_email, 
       vet_name, 
       avatar_url,
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
    .single();

  return (
    <nav className=" bg-background shadow-sm sticky top-0">
      <div className="flex justify-between items-center px-6 py-2">
        <div className="min-w-[240px]">
          <HospitalSelect
            hospitalList={vet?.hos_vet_mapping}
            defaultHospitalId={vet?.default_hos_id}
          />
        </div>

        <div className="flex items-center gap-2">
          <AddPatientButton />

          <Button size="icon" variant="ghost" className="rounded-full">
            <IoSearch size={20} />
          </Button>

          <Button size="icon" variant="ghost" className="rounded-full">
            <FaRegBell size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
