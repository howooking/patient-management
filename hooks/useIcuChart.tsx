import { useIcuSearchRange } from "@/lib/store/icu-search-range";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import useCurrentHospitalId from "./useCurrentHospital";
import { IcuChartJoined } from "@/types/type";

export default function useIcuChart() {
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
        .order("created_at", { ascending: true })
        .returns<IcuChartJoined[]>();

      if (date?.from) {
        // @ts-ignore
        query.gte("io_id.in_date", format(date.from, "yyyy-MM-dd"));
      }
      if (date?.to) {
        // @ts-ignore
        query.lte("io_id.in_date", format(addDays(date.to, 1), "yyyy-MM-dd"));
      }

      const { data } = await query;

      return data;
    },
  });

  return { icuChart, isLoading };
}
