import UserAvatar from "../common/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
