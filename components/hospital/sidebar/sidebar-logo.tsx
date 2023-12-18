"use client";

import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";
import Image from "next/image";
import logo from "@/public/logos/logo1.png";
import vetterhands from "@/public/logos/vetter-hands.png";
import Link from "next/link";

export default function SidebarLogo({
  defaultHospitalId,
}: {
  defaultHospitalId?: string | null;
}) {
  const { collapse } = useSidebarCollapse();
  return (
    <>
      <Link
        href={`/hospital/${defaultHospitalId}`}
        className="p-2 flex items-center gap-1"
      >
        <Image
          src={logo}
          alt="vetterhands logo"
          width={36}
          sizes="40px"
          priority
        />
        <Image
          width={160}
          src={vetterhands}
          alt="vetterhands logo"
          className={collapse ? "hidden" : "block"}
          sizes="160px"
          priority
        />
      </Link>
    </>
  );
}
