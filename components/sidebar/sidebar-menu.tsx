"use client";

import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  title: string;
  icon: JSX.Element;
  ready: boolean;
  path: string;
};

export default function SidebarMenu({ icon, ready, title, path }: Props) {
  const { collapse } = useSidebarCollapse();

  const pathname = usePathname();
  const hospitalId = pathname.split("/")[2];

  return (
    <li className="flex items-center">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={!ready}
              variant="ghost"
              className={cn(
                collapse
                  ? "w-[40px] justify-center"
                  : "w-[240px] justify-start px-2"
              )}
            >
              <Link
                href={`/hospital/${hospitalId}/${path}`}
                className={cn("flex items-center gap-4")}
              >
                {icon}
                <span className={collapse ? "hidden" : "block"}>{title}</span>
              </Link>
              <TooltipContent
                className={cn(collapse ? "block" : "hidden", "ml-3")}
                side="right"
              >
                <p>{title}</p>
              </TooltipContent>
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </li>
  );
}
