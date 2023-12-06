"use client";

import { FaRegSun, FaRegMoon } from "react-icons/fa6";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ToggleTheme() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <FaRegSun className="h-[1.2rem] w-[1.2rem] scale-100 dark:scale-0" />
          <FaRegMoon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          라이트모드
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("dark")}>
          다크모드
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("system")}>
          시스템과동일
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
