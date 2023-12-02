import UserAvatar from "./user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Signout from "./signout";

type AvatarDropdownProps = {
  src: string;
  fallback: string;
  email: string;
};

export default function AvatarDropdown({
  fallback,
  src,
  email,
}: AvatarDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar fallback={fallback} src={src} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>프로필설정</DropdownMenuItem>
        <DropdownMenuItem>그룹설정</DropdownMenuItem>
        <DropdownMenuItem asChild className="p-0">
          <Signout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
