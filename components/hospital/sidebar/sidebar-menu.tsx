"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";
import { Button } from "@/components/ui/button";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";

type Props = {
  title: string;
  icon: JSX.Element;
  ready: boolean;
  href: string;
};

export default function SidebarMenu({ icon, ready, title, href }: Props) {
  const { collapse } = useSidebarCollapse();

  const pathname = usePathname();

  const hospitalId = useCurrentHospitalId();
  const currnetRoute = pathname.split("/")[3] ?? "/";

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
                collapse
                  ? "w-[40px] justify-center"
                  : "w-[224px] justify-start",
                currnetRoute === href && "bg-primary/10"
              )}
              onClick={() => router.push(`/hospital/${hospitalId}/${href}`)}
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
