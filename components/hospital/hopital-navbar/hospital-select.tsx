"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  hospitalList:
    | {
        hospitals: {
          hos_id: string;
          name: string | null;
        } | null;
      }[]
    | undefined;
};

export default function HospitalSelect({ hospitalList }: Props) {
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
            {hospital.hospitals?.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
