"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaStar, FaRegStar } from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  hospitalList:
    | {
        hospitals: {
          hos_id: string;
          name: string | null;
          business_approved: boolean;
        } | null;
      }[]
    | undefined;

  defaultHospitalId?: string | null;
};

export default function HospitalSelect({
  hospitalList,
  defaultHospitalId,
}: Props) {
  const pathname = usePathname();
  const hospitalId = pathname.split("/")[2];
  const router = useRouter();

  const { toast } = useToast();
  const [isChanging, setIsChanging] = useState(false);

  const handleClick = async (hospitalId: string) => {
    setIsChanging(true);

    try {
      const response = await fetch(
        `${location.origin}/api/change-default-hospital`,
        {
          method: "PATCH",
          body: JSON.stringify({
            hospitalId,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "기본 병원이 변경되었습니다.",
        });
        router.refresh();
        return;
      }

      const data = await response.json();
      toast({
        variant: "destructive",
        title: data.error,
        description: "관리자에게 문의하세요",
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, "error while signing up");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="min-w-[240px]">
      <Select
        onValueChange={(value: string) => router.push(`/hospital/${value}`)}
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
