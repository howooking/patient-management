"use client";

import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";
import { FaApple } from "react-icons/fa6";

export default function SidebarMenu() {
  const { collapse } = useSidebarCollapse();
  return (
    <li className="flex items-center">
      <FaApple />
      <span className={collapse ? "hidden" : "block"}>profile</span>
    </li>
  );
}
