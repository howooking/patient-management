import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function HospitalSettingMenu() {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>병원 설정</DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>
            <Link href="/new-hospital">병원 추가</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>기본 병원 설정</DropdownMenuItem>

          {/* <DropdownMenuSeparator /> */}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
