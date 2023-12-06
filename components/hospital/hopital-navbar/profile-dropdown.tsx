import { FaAngleDown } from "react-icons/fa6";

import Signout from "@/components/common/signout";
import UserAvatar from "@/components/common/user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ToggleThemeMenu from "./toggle-theme-menu";
import Link from "next/link";

type Props = {
  src?: string | null;
  name?: string;
  email?: string;
};

export default function ProfileDropdown({ email, name, src }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex gap-2 p-1 pr-4">
          <UserAvatar fallback={name?.slice(0, 2) || ""} src={src ?? ""} />
          <div className="flex gap-1 items-center">
            <span>{name}</span>
            <FaAngleDown size={10} />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[256px] mx-1">
        <DropdownMenuLabel className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            <UserAvatar fallback={name?.slice(0, 2) || ""} src={src ?? ""} />
            <span>{name}</span>
          </div>
          <p className="text-sm">{email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>프로필 설정</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/new-hospital">병원 추가</Link>
        </DropdownMenuItem>
        <ToggleThemeMenu />

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="p-0">
          <Signout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
