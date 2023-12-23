"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SETTINGS } from "@/constants/menus";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import Link from "next/link";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

export default function SettingButton() {
  const hospitalId = useCurrentHospitalId();
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full">
          <IoSettingsOutline size={20} className="font-bold text-xs" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SETTINGS.map((setting) => (
          <DropdownMenuItem key={setting.title}>
            <Link
              href={`/hospital/${hospitalId}/settings/${setting.href}`}
              className="flex items-center gap-1"
              onClick={() => setOpen(false)}
            >
              {setting.icon}
              {setting.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
