"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { useSelectedPet } from "@/lib/store/selected-pets";
import { useSidebarCollapse } from "@/lib/store/sidebar-collapse";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

type Props = {
  hospitalList:
    | {
        hospitals: {
          hos_id: string;
          name: string | null;
        } | null;
      }[]
    | undefined;

  defaultHospitalId?: string | null;
};

export default function HospitalSelect({
  hospitalList,
  defaultHospitalId,
}: Props) {
  const supabase = createSupabaseBrowserClient();

  const hospitalId = useCurrentHospitalId();
  const router = useRouter();

  const { setSelectedPet } = useSelectedPet();

  const { toast } = useToast();
  const [isChanging, setIsChanging] = useState(false);

  const handleClick = async (hospitalId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    setIsChanging(true);

    const { error: vetError } = await supabase
      .from("vets")
      .update({ default_hos_id: hospitalId })
      .match({ vet_id: user.id });

    if (vetError) {
      toast({
        variant: "destructive",
        title: vetError.message,
        description: "관리자에게 문의하세요",
      });
      return;
    }
    toast({
      title: "기본 병원이 변경되었습니다.",
    });
    router.refresh();
    setIsChanging(false);
  };

  const { collapse } = useSidebarCollapse();

  return (
    <div className="p-2">
      <Select
        disabled={collapse}
        onValueChange={(value: string) => {
          router.push(`/hospital/${value}`);
          setSelectedPet(null);
        }}
        value={hospitalId}
      >
        <SelectTrigger disabled={hospitalList?.length === 0}>
          <SelectValue placeholder="병원을 등록해주세요" />
        </SelectTrigger>

        <SelectContent>
          {hospitalList?.map((hospital) => {
            const isDefault = defaultHospitalId === hospital.hospitals?.hos_id;
            return (
              <div className="relative flex" key={hospital.hospitals?.hos_id}>
                <SelectItem value={hospital.hospitals?.hos_id!}>
                  {hospital.hospitals?.name}
                </SelectItem>

                <Button
                  onClick={() => handleClick(hospital.hospitals?.hos_id!)}
                  size="icon"
                  variant="ghost"
                  disabled={isDefault || isChanging}
                  className={"w-10 text-yellow-300 disabled:opacity-100"}
                >
                  <FaRegStar className={cn(isDefault && "hidden")} />
                  <FaStar className={cn(!isDefault && "hidden")} />
                </Button>
              </div>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
