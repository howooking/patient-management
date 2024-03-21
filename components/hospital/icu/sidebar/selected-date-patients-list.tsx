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

export default function SelectedDatePatientList() {
  const { setSelectedIcuChartId } = useSelectedIcuChart();
  const { selectedIcuIoId, setSelectedIcuIoId } = useSelectedIcuIo();

  const { icuChart, isLoading } = useIcuChart();

  const { selectedDate } = useSelectedDate();
  const { group } = useIcuGroupFilter();
  const { vet } = useIcuVetFilter();

  const filteredIcuCharts = useMemo(() => {
    let filtered = icuChart
      // 내원일이 선택된 날짜와 같거나 작은 차트
      ?.filter((element) => element.io_id.in_date <= selectedDate)
      // 퇴원확정일이 없거나 있다면 현재 선택일과 같거나 큰 차트
      .filter(
        (element) =>
          !element.io_id.out_date || element.io_id.out_date >= selectedDate
      )
      // in_and_out 레코드의 created_at을 비교해야 일정한 순서를 보장
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

  // 해당일에 없는 차트에서 사이드바에 환자가 선택되기 위한 방법
  // { io_id1 : [ "2023-03-22", "2023-03-23" ], io_id2 : [ "2023-03-23", "2023-03-24" ] }
  const ioIdToTargetDateObj = useMemo(() => {
    const tempObj: { [key: number]: string[] } = {};
    filteredIcuCharts?.forEach((element) => {
      const {
        io_id: { io_id },
        target_date,
      } = element;

      if (tempObj[io_id]) {
        tempObj[io_id].push(target_date);
      } else {
        tempObj[io_id] = [target_date];
      }
    });
    return tempObj;
  }, [filteredIcuCharts]);

  const filteredResult = useMemo(
    () =>
      filteredIcuCharts?.filter((element) => {
        // 필터된 차트와 현재 선택된 날짜가 같은 차트
        if (element.target_date === selectedDate) {
          return true;
        }

        // 만약 날짜가 같지 않다면?

        const prevDate = format(
          subDays(parseISO(selectedDate), 1),
          "yyyy-MM-dd"
        );
        // ioIdToTargetDateObj에서 해당 io_id의 날짜가 없고 선택날짜의 전날과 해당 차트의 날짜가 일치하는 차트(결국 전날 차트가 포함된다.)
        return (
          !ioIdToTargetDateObj[element.io_id.io_id].includes(selectedDate) &&
          prevDate === element.target_date
        );
      }),
    [filteredIcuCharts, ioIdToTargetDateObj, selectedDate]
  );

  useEffect(() => {
    // 현재 선택한 날짜의 선택된 차트
    const selectedDateSelectedChart = filteredResult?.find(
      (element) => element.io_id.io_id === selectedIcuIoId
    );

    // 선택된 차트의 날짜와 현재 선택한 날짜가 같은 경우(일반적인경우) 해당 차트아이디를 전역차트아이디로
    // 날짜가 다른경우(익일 임시로 보이게 한경우) 전역차트아이디 undefined
    setSelectedIcuChartId(
      selectedDateSelectedChart?.target_date === selectedDate
        ? selectedDateSelectedChart.icu_chart_id
        : undefined
    );

    // 시작일 전날로 가면 selectedDateSelectedChart === undefined가 되므로 자연스럽게 io_id 전역값이 undefined가 된다.
    setSelectedIcuIoId(selectedDateSelectedChart?.io_id.io_id);
  }, [
    filteredIcuCharts,
    filteredResult,
    group,
    selectedDate,
    selectedIcuIoId,
    setSelectedIcuChartId,
    setSelectedIcuIoId,
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
