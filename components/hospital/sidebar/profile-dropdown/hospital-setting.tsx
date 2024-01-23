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
import { useRouter } from "next/navigation";

export default function HospitalSetting() {
  const { push } = useRouter();
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

          <DropdownMenuItem
            onClick={() => push(`/hospital/${hospitalId}/settings/hospital`)}
            className="cursor-pointer"
          >
            스태프 설정
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
