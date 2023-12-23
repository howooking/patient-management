import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoSettingsOutline } from "react-icons/io5";
import {
  PiPillFill,
  PiTestTubeFill,
  PiUserFill,
  PiBowlFoodFill,
} from "react-icons/pi";

export default function SettingButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full">
          <IoSettingsOutline size={20} className="font-bold text-xs" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex items-center gap-1">
          <PiUserFill />
          사용자설정
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-1">
          <PiTestTubeFill />
          검사설정
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-1">
          <PiPillFill />
          약물설정
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-1">
          <PiBowlFoodFill />
          식이설정
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
