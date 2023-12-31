"use client";

import { HiDotsVertical } from "react-icons/hi";
import React from "react";
import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";
import { cn } from "@/lib/utils";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/common/user-avatar";

type Props = { src?: string | null; name?: string; email?: string };

export default function ProfileDropdownTrigger({ src, name, email }: Props) {
  const { collapse } = useSidebarCollapse();
  return (
    <DropdownMenuTrigger asChild>
      <Button
        className={cn(
          "flex gap-4 w-full bg-background rounded-none border-input text-foreground h-13 hover:bg-muted border-t justify-between shadow-none p-3"
        )}
      >
        <div className="flex items-center gap-4">
          <UserAvatar
            fallback={name?.slice(0, 2) ?? ""}
            src={src ?? "/default-avatar.jpg"}
          />
          <div
            className={cn(collapse ? "hidden" : "flex", "flex-col items-start")}
          >
            <span className="leading-4 font-semibold">{name}</span>
            <span className="text-xs text-border">{email}</span>
          </div>
        </div>
        <HiDotsVertical className={collapse ? "hidden" : "block"} />
      </Button>
    </DropdownMenuTrigger>
  );
}
