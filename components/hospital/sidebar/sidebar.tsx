import { FaRegBell } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import createSupabaseServerClient from "@/lib/supabase/server";
import ProfileDropdown from "./profile-dropdown";
import { Separator } from "@/components/ui/separator";
import HospitalSelect from "./hospital-select";

export default async function Sidebar() {
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
    <aside className="border-r border-input min-h-screen w-[264px]">
      <div className="flex items-center justify-between p-2">
        <ProfileDropdown
          name={vet?.vet_name}
          src={vet?.avatar_url}
          email={vet?.vet_email}
        />

        <Button size="icon" variant="ghost">
          <FaRegBell />
        </Button>
      </div>

      <Separator />

      <div className="p-2">
        <HospitalSelect hospitalList={vet?.hos_vet_mapping} />
      </div>
    </aside>
  );
}

const PRODUCT_MENUS = [
  {
    title: "입원환자관리",
    href: "/space/icu-management",
  },
  {
    title: "외과차트",
    href: "/space/icu-management",
  },
  {
    title: "초음파차트",
    href: "/space/icu-management",
  },
  {
    title: "CHATVET",
    href: "/space/icu-management",
  },
];
