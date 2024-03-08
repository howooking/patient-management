"use client";

import { Button } from "@/components/ui/button";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

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
      <Button
        disabled={!ready}
        variant="ghost"
        className={cn(
          currnetRoute === href && "bg-primary/10",
          "duration-500 transition-all p-2 w-full"
        )}
        onClick={() => router.push(`/hospital/${hospitalId}/${href}`)}
      >
        <div className="flex items-center gap-4 w-full justify-start">
          <div className="flex-0">{icon}</div>
          <span className={collapse ? "hidden" : "block"}>{title}</span>
        </div>
      </Button>
    </li>
  );
}
