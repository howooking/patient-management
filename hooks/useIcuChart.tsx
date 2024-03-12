"use client";

import { useIcuSearchRange } from "@/lib/store/icu-search-range";
import { useSelectedIchChart } from "@/lib/store/selected-icu-chart";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import useCurrentHospitalId from "./useCurrentHospital";
import { IcuChart } from "@/types/type";

export default function useIcuChart() {
  const { setSelectedIcuChartId } = useSelectedIchChart();
  const hos_id = useCurrentHospitalId();
  const { date } = useIcuSearchRange();

  const { data: icuChart, isLoading } = useQuery({
    queryKey: ["icu_chart", date?.from, date?.to],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient();
      let query = supabase
        .from("icu_chart")
        .select(
          `
          *,
          io_id!inner(*),
          pet_id(*),
          main_vet(*),
          sub_vet(*)
        `
        )
        .match({ hos_id })
        .returns<IcuChart[]>();

      if (date?.from) {
        // @ts-ignore
        query.gte("io_id.in_date", date.from.toISOString());
      }
      if (date?.to) {
        // @ts-ignore
        query.lte(
          "io_id.in_date",
          format(addDays(date.to, 1), "yyyy-MM-dd'T'HH:mm:ssxxx")
        );
      }

      const { data } = await query;

      // 맨처음 차트 선택 차트로 지정
      if (data) {
        setSelectedIcuChartId(data[0].icu_chart_id);
      }
      return data;
    },
  });

  return { icuChart, isLoading };
}
