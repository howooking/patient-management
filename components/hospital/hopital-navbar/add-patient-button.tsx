"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserPlus } from "react-icons/fa6";

export default function AddPatientButton() {
  const pathname = usePathname();
  const hospitalId = pathname.split("/")[2];
  return (
    <Button className="rounded-full flex items-center gap-2" asChild>
      {/* 그냥 모달로 하는게 나을듯. */}
      <Link href={`/hospital/${hospitalId}/patients/new`}>
        <FaUserPlus size={20} />
        환자 추가
      </Link>
    </Button>
  );
}
