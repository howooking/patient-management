"use client";

import { FaAngleRight } from "react-icons/fa6";
import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CollapseButton() {
  const { collapse, setCollapse } = useSidebarCollapse();

  return (
    <div
      className={cn("p-2 flex", collapse ? "justify-center" : "justify-end")}
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setCollapse(!collapse)}
        className="rounded-full"
      >
        <FaAngleRight
          className={cn(collapse ? "rotate-0" : "rotate-180", "transition")}
        />
      </Button>
    </div>
  );
}
