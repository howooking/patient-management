"use client";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

import { Button } from "../ui/button";
import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";

export default function CollapseButton() {
  const { collapse, setCollapse } = useSidebarCollapse();

  return (
    <section className="p-2">
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
