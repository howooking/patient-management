import { FaRegBell } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import createSupabaseServerClient from "@/lib/supabase/server";
import ProfileDropdown from "./profile-dropdown";
import HospitalSelect from "./hospital-select";

export default async function HospitalNavbar() {
  const supabase = await createSupabaseServerClient();

  const { data: vet } = await supabase
    .from("vets")
    .select(
      `vet_email, 
       vet_name, 
       avatar_url,
       hos_vet_mapping (
        hospitals (
          hos_id,
          name
        )
       )
      `
    )
    .single();

  return (
    <nav className="border-b border-input ">
      <div className="container flex justify-between items-center p-2">
        <div className="min-w-[240px]">
          <HospitalSelect hospitalList={vet?.hos_vet_mapping} />
        </div>

        <div className="flex items-center justify-between gap-2">
          <ProfileDropdown
            name={vet?.vet_name}
            src={vet?.avatar_url}
            email={vet?.vet_email}
          />

          <Button size="icon" variant="ghost">
            <FaRegBell />
          </Button>

          <Button>Upgrade</Button>
        </div>
      </div>
    </nav>
  );
}
