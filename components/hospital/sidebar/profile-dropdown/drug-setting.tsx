"use client";

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { useRouter } from "next/navigation";

export default function DrugSetting() {
  const hospitalId = useCurrentHospitalId();
  const router = useRouter();
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>약물 설정</DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            onClick={() => router.push(`/hospital/${hospitalId}/settings/drug`)}
            className="cursor-pointer"
          >
            약물원료 설정
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              router.push(`/hospital/${hospitalId}/settings/drug/product`)
            }
            className="cursor-pointer"
          >
            약물제품 설정
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
