import Signout from "@/components/hospital/hopital-navbar/signout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import HospitalSettingMenu from "../hospital/hopital-navbar/hospital-setting-menu";
import ToggleThemeMenu from "../hospital/hopital-navbar/toggle-theme-menu";
import ProfileDropdownTrigger from "./profile-dropdown-trigger";

type Props = {
  src?: string | null;
  name?: string;
  email?: string;
  hospitalList:
    | {
        hospitals: {
          hos_id: string;
          name: string | null;
          business_approved: boolean;
        } | null;
      }[]
    | undefined;
};

export default function Profile({ email, name, src, hospitalList }: Props) {
  return (
    <DropdownMenu>
      {/* client component */}
      <ProfileDropdownTrigger name={name} src={src} email={email} />

      <DropdownMenuContent className="w-[240px] ml-2 border-input shadow-lg">
        <DropdownMenuItem>사용자 설정</DropdownMenuItem>
        <DropdownMenuItem>약물 설정</DropdownMenuItem>
        <DropdownMenuItem>식이 설정</DropdownMenuItem>

        <HospitalSettingMenu hospitalList={hospitalList} />

        <ToggleThemeMenu />

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="p-0">
          <Signout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
