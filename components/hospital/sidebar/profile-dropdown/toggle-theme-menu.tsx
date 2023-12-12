"use client";

import { useTheme } from "next-themes";
import { FaRegSun, FaRegMoon } from "react-icons/fa6";

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export default function ToggleThemeMenu() {
  const { systemTheme, setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>테마 설정</DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <div className="flex items-center gap-2">
              <FaRegSun />
              밝은 테마
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <div className="flex items-center gap-2">
              <FaRegMoon />
              어두운 테마
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setTheme("system")}>
            <div className="flex items-center gap-2">
              {systemTheme === "dark" ? <FaRegMoon /> : <FaRegSun />}
              기기 기본값
            </div>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
