"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";

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
  const router = useRouter();

  return (
    <li>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={!ready}
              variant="ghost"
              className={cn(
                collapse ? "w-[40px] justify-center" : "w-[240px] justify-start"
              )}
              onClick={() => router.push(`/hospital/${hospitalId}/${path}`)}
            >
              <div className="flex items-center gap-4">
                {icon}
                <span className={collapse ? "hidden" : "block"}>{title}</span>
              </div>
            </Button>
          </TooltipTrigger>

          <TooltipContent
            className={cn(collapse ? "block" : "hidden", "ml-3")}
            side="right"
          >
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </li>
  );
}
