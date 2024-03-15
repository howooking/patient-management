import { useIcuSearchRange } from "@/lib/store/icu-search-range";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import useCurrentHospitalId from "./useCurrentHospital";
import { type TxJoined } from "@/types/type";

export default function useTx() {
  const hos_id = useCurrentHospitalId();
  const { date } = useIcuSearchRange();

  const { data: tx, isLoading } = useQuery({
    queryKey: ["tx", date?.from, date?.to],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient();
      let query = supabase
        .from("tx")
        .select(
          `
          *,
          io_id!inner(*),
          icu_chart_tx_id(*)
        `
        )
        .eq("io_id.hos_id", hos_id)
        .returns<TxJoined[]>();

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

  return { tx, isLoading };
}
