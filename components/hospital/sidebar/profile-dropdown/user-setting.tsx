"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { useRouter } from "next/navigation";

export default function UserSetting() {
  const hospitalId = useCurrentHospitalId();
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={() => router.push(`/hospital/${hospitalId}/settings/user`)}
      className="cursor-pointer"
    >
      사용자 설정
    </DropdownMenuItem>
  );
}
