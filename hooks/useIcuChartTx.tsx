import { useIcuSearchRange } from "@/lib/store/icu-search-range";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import useCurrentHospitalId from "./useCurrentHospital";
import { type IcuChartTxJoined } from "@/types/type";

export default function useIcuChartTx() {
  const hos_id = useCurrentHospitalId();
  const { date } = useIcuSearchRange();

  const { data: icuChartTx, isLoading } = useQuery({
    queryKey: ["icu_chart_tx", date?.from, date?.to],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient();
      let query = supabase
        .from("icu_chart_tx")
        .select(
          `
            *,
            io_id!inner(*),
            done_1(*),
            done_2(*),
            done_3(*),
            done_4(*),
            done_5(*),
            done_6(*),
            done_7(*),
            done_8(*),
            done_9(*),
            done_10(*),
            done_11(*),
            done_12(*),
            done_13(*),
            done_14(*),
            done_15(*),
            done_16(*),
            done_17(*),
            done_18(*),
            done_19(*),
            done_20(*),
            done_21(*),
            done_22(*),
            done_23(*),
            done_24(*)
          `
        )
        .eq("io_id.hos_id", hos_id)
        .order("todo_name")
        .returns<IcuChartTxJoined[]>();

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

  return { icuChartTx, isLoading };
}
