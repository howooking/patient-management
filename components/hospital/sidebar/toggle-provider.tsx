"use client";

import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";
import { cn } from "@/lib/utils";
import React from "react";

export default function ToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapse } = useSidebarCollapse();
  return (
    <aside
      className={cn(
        collapse ? "w-[56px]" : "w-[256px]",
        "transition-all",
        "shadow-sm"
      )}
    >
      {children}
    </aside>
  );
}
