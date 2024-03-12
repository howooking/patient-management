"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useIcuChart from "@/hooks/useIcuChart";
import { useIcuGroupFilter } from "@/lib/store/icu-group-filter";
import { useMemo } from "react";

export default function GroupFilter() {
  const { group, setGroup } = useIcuGroupFilter();
  const { icuChart } = useIcuChart();
  const groupOptions = useMemo(
    () => [...new Set(icuChart?.map((element) => element.io_id.group))],
    [icuChart]
  );

  return (
    <Select value={group} onValueChange={setGroup} defaultValue="그룹">
      <SelectTrigger className="text-xs h-6 w-20">
        <SelectValue placeholder="그룹" />
      </SelectTrigger>
      <SelectContent>
        {["그룹", ...groupOptions].map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
