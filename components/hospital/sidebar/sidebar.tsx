import SidebarLoading from "@/components/loadings/sidebar-loading";
import { Separator } from "@/components/ui/separator";
import { SIDEBAR_NAV_MENUS } from "@/constants/menus";
import { Suspense } from "react";
import HospitalSelectServer from "./hospital-select-server";
import ProfileDropdownServer from "./profile-dropdown/profile-dropdown-server";
import SidebarMenu from "./sidebar-menu";
import ToggleProvider from "./toggle-provider";
import ProfileDropdownLoading from "@/components/loadings/profile-dropdown-loading";

export default async function Sidebar() {
  return (
    <ToggleProvider>
      <div className="bg-background border-r border-input flex flex-col sidebar_hieght">
        <Suspense fallback={<SidebarLoading />}>
          <HospitalSelectServer />
        </Suspense>

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

        <Suspense fallback={<ProfileDropdownLoading />}>
          <ProfileDropdownServer />
        </Suspense>
      </div>
    </ToggleProvider>
  );
}
