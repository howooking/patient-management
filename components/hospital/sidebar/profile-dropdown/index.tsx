import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import HospitalSetting from "./hospital-setting";
import ProfileDropdownTrigger from "./profile-dropdown-trigger";
import Signout from "./signout";
import TestSetting from "./test-setting";
import ToggleThemeMenu from "./toggle-theme-menu";
import DrugSetting from "./drug-setting";
import UserSetting from "./user-setting";

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
        <UserSetting />

        <TestSetting />

        <DrugSetting />

        <HospitalSetting hospitalList={hospitalList} />

        <ToggleThemeMenu />

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="p-0">
          <Signout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
