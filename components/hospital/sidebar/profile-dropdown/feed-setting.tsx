"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { useRouter } from "next/navigation";

export default function FeedSetting() {
  const hospitalId = useCurrentHospitalId();
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={() => router.push(`/hospital/${hospitalId}/settings/feed`)}
      className="cursor-pointer"
    >
      사료 설정
    </DropdownMenuItem>
  );
}
