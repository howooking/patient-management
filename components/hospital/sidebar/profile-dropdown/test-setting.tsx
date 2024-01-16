"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { useRouter } from "next/navigation";

export default function TestSetting() {
  const hospitalId = useCurrentHospitalId();
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={() => router.push(`/hospital/${hospitalId}/settings/test`)}
      className="cursor-pointer"
    >
      검사 설정
    </DropdownMenuItem>
  );
}
