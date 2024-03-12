"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useIcuChart from "@/hooks/useIcuChart";
import { useSelectedDate } from "@/lib/store/date";
import { useIcuGroupFilter } from "@/lib/store/icu-group-filter";
import { useIcuVetFilter } from "@/lib/store/icu-vet-filter";
import { useSelectedIchChart } from "@/lib/store/selected-icu-chart";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useCallback, useEffect } from "react";

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
        (element) =>
          element.io_id.in_date.slice(0, 10) <=
          format(selectedDate, "yyyy-MM-dd")
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

  // 웹소켓
  const supabase = createSupabaseBrowserClient();
  const queryClient = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel("icu_chart")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "icu_chart" },
        async (payload) => {
          if (payload) {
            queryClient.invalidateQueries({
              queryKey: [`icu_chart`],
            });
          }
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, supabase]);

  // 현재 선택한 환자
  const { selectedIcuChartId, setSelectedIcuChartId } = useSelectedIchChart();
  console.log(selectedIcuChartId);

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
            {chart.pet_id.name} ({chart.pet_id.breed})
          </Button>
        </li>
      ))}
    </ul>
  );
}
{
  /* <div className="flex items-center ">
{isLoading ? (
  <div className="flex gap-2 itmes-center">
    <Skeleton className="w-10 h-6" />
    <Skeleton className="w-10 h-6" />
    <Skeleton className="w-10 h-6" />
    <Skeleton className="w-10 h-6" />
    <Skeleton className="w-10 h-6" />
    <Skeleton className="rounded-full w-6 h-6" />
  </div>
) : ( */
}
