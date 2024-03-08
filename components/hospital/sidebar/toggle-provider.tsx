"use client";

import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";
import { cn } from "@/lib/utils";
import React from "react";

export default function ToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapse, setCollapse } = useSidebarCollapse();

  return (
    <aside
      onMouseEnter={() => setCollapse(false)}
      onMouseLeave={() => setCollapse(true)}
      className={cn(
        collapse ? "w-[50px]" : "w-[200px]",
        "transition-all duration-500"
      )}
    >
      {children}
    </aside>
  );
}
