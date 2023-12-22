import { Separator } from "@/components/ui/separator";
import { SIDEBAR_NAV_MENUS } from "@/constants/menus";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import HospitalSelect from "./hospital-select";
import CollapseButton from "./collapse-button";
import ProfileDropdown from "./profile-dropdown";
import SidebarMenu from "./sidebar-menu";
import ToggleProvider from "./toggle-provider";

export default async function Sidebar() {
  const supabase = await createSupabaseServerClient(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    .match({ vet_id: user?.id })
    .single();

  return (
    <ToggleProvider>
      <div className="bg-background border-r border-input flex flex-col sidebar_hieght">
        <HospitalSelect
          defaultHospitalId={vet?.default_hos_id}
          hospitalList={vet?.hos_vet_mapping}
        />
        <Separator />

        <nav className="flex-1 p-2">
          <ul className="flex flex-col gap-2">
            {SIDEBAR_NAV_MENUS.map((menu) => (
              <SidebarMenu
                key={menu.title}
                title={menu.title}
                icon={menu.icon}
                href={menu.href}
                ready={menu.ready}
              />
            ))}
          </ul>
        </nav>

        <CollapseButton />

        <ProfileDropdown
          name={vet?.vet_name}
          src={vet?.avatar_url}
          email={vet?.vet_email}
          hospitalList={vet?.hos_vet_mapping}
        />
      </div>
    </ToggleProvider>
  );
}
