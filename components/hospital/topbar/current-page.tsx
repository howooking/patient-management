"use client";

import { SIDEBAR_NAV_MENUS_TRANSLATOR } from "@/constants/menus";
import { usePathname } from "next/navigation";

export default function CurrentPage() {
  const pathname = usePathname();
  const currPage = pathname.split("/")[3];

  return <p>{SIDEBAR_NAV_MENUS_TRANSLATOR[currPage]}</p>;
}
