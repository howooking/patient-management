"use client";

import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  icon: JSX.Element;
  ready: boolean;
};

export default function SidebarMenu({ icon, ready, title }: Props) {
  const { collapse } = useSidebarCollapse();
  return (
    <li className="flex items-center">
      <Button
        disabled={!ready}
        variant="ghost"
        className={cn(
          "flex items-center gap-4 w-[240px] p-0",
          collapse ? "w-[40px] justify-center" : "w-[240px] justify-start px-2"
        )}
      >
        {icon}
        <span className={collapse ? "hidden" : "block"}>{title}</span>
      </Button>
    </li>
  );
}
