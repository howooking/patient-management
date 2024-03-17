"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useIcuChart from "@/hooks/useIcuChart";
import { useIcuVetFilter } from "@/lib/store/icu-vet-filter";
import { useMemo } from "react";

export default function VetFilter() {
  const { vet, setVet } = useIcuVetFilter();
  const { icuChart } = useIcuChart();
  const vets = icuChart?.map((element) => {
    return { id: element.main_vet?.vet_id, name: element.main_vet?.vet_name };
  });

  const vetOptions: { id: string; name: string }[] = useMemo(
    () =>
      vets
        ? Array.from(
            vets.reduce((acc, vet) => acc.set(vet.id, vet), new Map()).values()
          )
        : [],
    [vets]
  );

  return (
    <Select value={vet} onValueChange={setVet} defaultValue="0">
      <SelectTrigger className="text-xs h-6 w-20">
        <SelectValue placeholder="수의사" />
      </SelectTrigger>
      <SelectContent>
        {[{ id: "0", name: "수의사" }, ...vetOptions].map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
