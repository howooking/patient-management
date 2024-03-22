"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useIcuChart from "@/hooks/useIcuChart";
import { useIcuGroupFilter } from "@/lib/store/icu-group-filter";
import { useIcuVetFilter } from "@/lib/store/icu-vet-filter";
import { useSelectedDate } from "@/lib/store/selected-date";
import { useSelectedIcuChart } from "@/lib/store/selected-icu-chart";
import { useSelectedIcuIo } from "@/lib/store/selected-icu-io";
import { cn, truncateBreed } from "@/lib/utils";
import { compareAsc, parseISO } from "date-fns";
import { useEffect, useMemo } from "react";

export default function SelectedDatePatientList() {
  const { selectedIcuChartId, setSelectedIcuChartId } = useSelectedIcuChart();
  const { selectedIcuIoId, setSelectedIcuIoId } = useSelectedIcuIo();

  const { icuChart, icuChartLoading } = useIcuChart();

  const { selectedDate } = useSelectedDate();
  const { group } = useIcuGroupFilter();
  const { vet } = useIcuVetFilter();

  const filteredIcuCharts = useMemo(() => {
    let filtered = icuChart
      ?.filter((element) => element.target_date === selectedDate)
      .sort((a, b) =>
        compareAsc(parseISO(a.io_id.created_at), parseISO(b.io_id.created_at))
      );

    if (group !== "그룹") {
      filtered = filtered?.filter((element) => element.io_id.group === group);
    }
    if (vet !== "0") {
      filtered = filtered?.filter((element) => element.main_vet.vet_id === vet);
    }
    return filtered;
  }, [group, icuChart, selectedDate, vet]);

  useEffect(() => {
    const selectedDateSelectedChart = filteredIcuCharts?.find(
      (element) => element.io_id.io_id === selectedIcuIoId
    );

    setSelectedIcuIoId(selectedDateSelectedChart?.io_id.io_id);
    setSelectedIcuChartId(selectedDateSelectedChart?.icu_chart_id);
  }, [
    filteredIcuCharts,
    group,
    selectedDate,
    selectedIcuIoId,
    setSelectedIcuChartId,
    setSelectedIcuIoId,
    vet,
  ]);

  if (icuChartLoading) {
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
    <div className="flex flex-col w-full">
      <Button
        size="sm"
        variant="outline"
        className={cn(
          !selectedIcuIoId &&
            "bg-primary text-white hover:text-white hover:bg-primary/80",
          "w-full text-left rounded-none"
        )}
        onClick={() => {
          setSelectedIcuChartId(undefined);
          setSelectedIcuIoId(undefined);
        }}
      >
        종합현황
      </Button>
      {filteredIcuCharts?.map((chart) => (
        <Button
          key={chart.icu_chart_id}
          size="sm"
          variant="outline"
          className={cn(
            chart.io_id.io_id === selectedIcuIoId &&
              "bg-primary text-white hover:text-white hover:bg-primary/80",
            "w-full text-left rounded-none ",
            chart.io_id.out_date && "line-through"
          )}
          onClick={() => {
            setSelectedIcuIoId(chart.io_id.io_id);
            setSelectedIcuChartId(chart.icu_chart_id);
          }}
        >
          {chart.pet_id.name} ( {truncateBreed(chart.pet_id.breed)})
        </Button>
      ))}
    </div>
  );
}
