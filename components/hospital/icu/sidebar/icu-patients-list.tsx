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
import { compareAsc, format, parseISO, subDays } from "date-fns";
import { useEffect, useMemo } from "react";

export default function IcuPatientsList() {
  const { setSelectedIcuChartId } = useSelectedIcuChart();
  const { selectedIcuIoId, setSelectedIcuIoId } = useSelectedIcuIo();

  // 차트 데이터
  const { icuChart, isLoading } = useIcuChart();

  // 필터
  const { selectedDate } = useSelectedDate();
  const { group } = useIcuGroupFilter();
  const { vet } = useIcuVetFilter();

  const filteredIcuCharts = useMemo(() => {
    let filtered = icuChart
      ?.filter((element) => element.io_id.in_date <= selectedDate)
      .filter(
        (element) =>
          !element.io_id.out_date || element.io_id.out_date >= selectedDate
      )
      .sort((a, b) =>
        compareAsc(parseISO(a.io_id.in_date), parseISO(b.io_id.in_date))
      );

    // 필터
    if (group !== "그룹") {
      filtered = filtered?.filter((element) => element.io_id.group === group);
    }
    if (vet !== "0") {
      filtered = filtered?.filter((element) => element.main_vet.vet_id === vet);
    }
    return filtered;
  }, [group, icuChart, selectedDate, vet]);

  // { io_id1 : [ "2023-03-22", "2023-03-23" ], io_id2 : [ "2023-03-23", "2023-03-24" ] }
  const ioIdToTargetDateObj: { [key: number]: string[] } = {};

  filteredIcuCharts?.forEach((element) => {
    const {
      io_id: { io_id },
      target_date,
    } = element;

    if (ioIdToTargetDateObj[io_id]) {
      ioIdToTargetDateObj[io_id].push(target_date);
    } else {
      ioIdToTargetDateObj[io_id] = [target_date];
    }
  });

  const filteredResult = useMemo(
    () =>
      filteredIcuCharts?.filter((element) => {
        if (element.target_date === selectedDate) {
          return true;
        }
        const prevDate = format(
          subDays(parseISO(selectedDate), 1),
          "yyyy-MM-dd"
        );
        return (
          !ioIdToTargetDateObj[element.io_id.io_id].includes(selectedDate) &&
          prevDate === element.target_date
        );
      }),
    [filteredIcuCharts, ioIdToTargetDateObj, selectedDate]
  );

  // 선택일자에 해당하는 chart로 바꿈
  useEffect(() => {
    const currentDateChartId = filteredIcuCharts
      ?.filter((element) => element.io_id.io_id === selectedIcuIoId)
      .find((element) => element.target_date === selectedDate)?.icu_chart_id;
    setSelectedIcuChartId(currentDateChartId);
  }, [
    filteredIcuCharts,
    group,
    selectedDate,
    selectedIcuIoId,
    setSelectedIcuChartId,
    vet,
  ]);

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
      {filteredResult?.map((chart) => (
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
