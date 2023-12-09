import { createSupabaseServerClient } from "@/lib/supabase/server";
import HospitalSelect from "../hospital/hopital-navbar/hospital-select";
import {
  FaPlus,
  FaDog,
  FaClipboardCheck,
  FaMaskFace,
  FaListCheck,
} from "react-icons/fa6";
import Profile from "./profile";
import CollapseButton from "./collapse-button";
import ToggleSidebar from "./toggle-sidebar";
import SidebarMenu from "./sidebar-menu";
import { Separator } from "../ui/separator";
import SidebarLogo from "./sidebar-logo";

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
      <div className="bg-background border-r border-input flex flex-col items-center h-screen">
        <SidebarLogo defaultHospitalId={vet?.default_hos_id} />
        <Separator />

        <nav className="flex-1 py-2">
          <ul className="flex flex-col gap-2">
            {SIDEBAR_NAV_MENUS.map((menu) => (
              <SidebarMenu
                key={menu.title}
                title={menu.title}
                icon={menu.icon}
                ready={menu.ready}
              />
            ))}
          </ul>
        </nav>

        <Separator />

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
const SIDEBAR_NAV_MENUS = [
  {
    title: "환자등록",
    href: "/icu",
    icon: <FaPlus size={20} />,
    ready: true,
  },
  {
    title: "입원실",
    href: "/icu",
    icon: <FaClipboardCheck size={20} />,
    ready: true,
  },
  {
    title: "진료실",
    href: "/diagnose",
    icon: <FaDog size={20} />,
    ready: false,
  },
  {
    title: "수술실",
    href: "/surgery",
    icon: <FaMaskFace size={20} />,
    ready: false,
  },
  {
    title: "건강검진",
    icon: <FaListCheck size={20} />,
    href: "/icu",
    ready: false,
  },
];
