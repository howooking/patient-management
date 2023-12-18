import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import HospitalSettingMenu from "./hospital-setting-menu";
import ProfileDropdownTrigger from "./profile-dropdown-trigger";
import ToggleThemeMenu from "./toggle-theme-menu";
import Signout from "./signout";

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

export default function ProfileDropdown({
  email,
  name,
  src,
  hospitalList,
}: Props) {
  return (
    <DropdownMenu>
      <ProfileDropdownTrigger name={name} src={src} email={email} />

      <DropdownMenuContent className="w-[240px] ml-2 border-input shadow-lg">
        <DropdownMenuItem>사용자 설정</DropdownMenuItem>

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
