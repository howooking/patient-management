import { Button } from "@/components/ui/button";
import createSupabaseServerClient from "@/lib/supabase/server";
import { FaRegBell } from "react-icons/fa6";
import ProfileDropdown from "./profile-dropdown";

export default async function Sidebar() {
  const supabase = await createSupabaseServerClient();

  const { data: vet } = await supabase
    .from("vets")
    .select("vet_email, vet_name, license_approved, default_hos_id, avatar_url")
    .single();

  return (
    <aside className="border-r min-h-screen w-[264px] p-2">
      <div className="flex items-center justify-between">
        <ProfileDropdown
          name={vet?.vet_name}
          src={vet?.avatar_url}
          email={vet?.vet_email}
        />

        <Button size="icon" variant="ghost">
          <FaRegBell />
        </Button>
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
