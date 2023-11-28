import UserAvatar from "../common/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type AvatarDropdownProps = {
  src: string;
  fallback: string;
  email: string;
  signOut: () => Promise<never>;
};

export default function AvatarDropdown({
  fallback,
  src,
  email,
  signOut,
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
          <form action={signOut}>
            <Button variant="destructive" className="w-full h-7">
              로그아웃
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
