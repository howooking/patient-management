"use client";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CollapseButton() {
  const { collapse, setCollapse } = useSidebarCollapse();

  return (
    <section
      className={cn("p-2 flex", collapse ? "justify-center" : "justify-end")}
    >
      {collapse ? (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapse(false)}
          className="rounded-full"
        >
          <FaAngleRight />
        </Button>
      ) : (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapse(true)}
          className="rounded-full"
        >
          <FaAngleLeft />
        </Button>
      )}
    </section>
  );
}
