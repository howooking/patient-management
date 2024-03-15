"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useIcuChart from "@/hooks/useIcuChart";
import { useIcuGroupFilter } from "@/lib/store/icu-group-filter";
import { useIcuVetFilter } from "@/lib/store/icu-vet-filter";
import { useSelectedDate } from "@/lib/store/selected-date";
import { useSelectedIchChart } from "@/lib/store/selected-icu-chart";
import { cn, truncateBreed } from "@/lib/utils";
import { useCallback } from "react";

export default function IcuPatientsList() {
  // 차트 데이터
  const { icuChart, isLoading } = useIcuChart();

  // 필터
  const { selectedDate } = useSelectedDate();
  const { group } = useIcuGroupFilter();
  const { vet } = useIcuVetFilter();
  const filteredIcuCharts = useCallback(
    (group?: string, vet?: string) => {
      let filtered = icuChart?.filter(
        (element) => element.io_id.in_date <= selectedDate
      );
      if (group !== "그룹") {
        filtered = filtered?.filter((element) => element.io_id.group === group);
      }
      if (vet !== "0") {
        filtered = filtered?.filter(
          (element) => element.main_vet.vet_id === vet
        );
      }
      return filtered;
    },
    [icuChart, selectedDate]
  );
  const { selectedIcuChartId, setSelectedIcuChartId } = useSelectedIchChart();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-0.5">
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
      </div>
    );
  }

  return (
    <ul className="flex flex-col w-full">
      <Button
        size="sm"
        variant="outline"
        className={cn(
          selectedIcuChartId === 0 &&
            "bg-primary text-white hover:text-white hover:bg-primary/80",
          "w-full text-left rounded-none"
        )}
        onClick={() => setSelectedIcuChartId(0)}
      >
        종합현황
      </Button>
      {filteredIcuCharts(group, vet)?.map((chart) => (
        <li key={chart.icu_chart_id}>
          <Button
            size="sm"
            variant="outline"
            className={cn(
              chart.icu_chart_id === selectedIcuChartId &&
                "bg-primary text-white hover:text-white hover:bg-primary/80",
              "w-full text-left rounded-none"
            )}
            onClick={() => setSelectedIcuChartId(chart.icu_chart_id)}
          >
            {chart.pet_id.name} ( {truncateBreed(chart.pet_id.breed)})
          </Button>
        </li>
      ))}
    </ul>
  );
}
