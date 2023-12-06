"use client";

import { FaStar } from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
  const { push } = useRouter();
  const hospitalId = pathname.split("/")[2];

  return (
    <Select
      onValueChange={(value) => push(`/hospital/${value}`)}
      value={hospitalId}
      defaultValue={hospitalId}
    >
      <SelectTrigger disabled={hospitalList?.length === 0}>
        <SelectValue placeholder="병원을 등록해주세요" />
      </SelectTrigger>
      <SelectContent>
        {hospitalList?.map((hospital) => (
          <SelectItem
            key={hospital.hospitals?.hos_id}
            value={hospital.hospitals?.hos_id!}
          >
            <div className="flex items-center gap-2">
              {hospital.hospitals?.name}
              <FaStar
                className={cn(
                  defaultHospitalId !== hospital.hospitals?.hos_id && "hidden",
                  "text-yellow-300"
                )}
              />
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
