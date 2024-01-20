"use client";

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import Link from "next/link";

export default function HospitalSetting() {
  const hospitalId = useCurrentHospitalId();
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>병원 설정</DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>
            <Link href="/new-hospital/search"> + 병원 추가하기</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link href={`/hospital/${hospitalId}/settings/hospital`}>
              병원직원 설정
            </Link>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
