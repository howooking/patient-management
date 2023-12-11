import { createSupabaseServerClient } from "@/lib/supabase/server";

import Profile from "./profile";
import CollapseButton from "./collapse-button";
import ToggleSidebar from "./toggle-sidebar";
import SidebarMenu from "./sidebar-menu";
import { Separator } from "../ui/separator";
import SidebarLogo from "./sidebar-logo";
import { SIDEBAR_NAV_MENUS } from "@/constants/menus";

export default async function Sidebar() {
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
    <ToggleSidebar>
      <div className="bg-background border-r border-input flex flex-col h-screen">
        <SidebarLogo defaultHospitalId={vet?.default_hos_id} />

        <Separator />

        <nav className="flex-1 p-2">
          <ul className="flex flex-col gap-2">
            {SIDEBAR_NAV_MENUS.map((menu) => (
              <SidebarMenu
                key={menu.title}
                title={menu.title}
                icon={menu.icon}
                path={menu.path}
                ready={menu.ready}
              />
            ))}
          </ul>
        </nav>

        <CollapseButton />

        <Profile
          name={vet?.vet_name}
          src={vet?.avatar_url}
          email={vet?.vet_email}
          hospitalList={vet?.hos_vet_mapping}
        />
      </div>
    </ToggleSidebar>
  );
}
