import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import useCurrentHospitalId from "./useCurrentHospital";

export default function useHospitalGroup() {
  const hos_id = useCurrentHospitalId();
  const { data } = useQuery({
    queryKey: [`${hos_id}-group`],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient();
      const { data } = await supabase
        .from("hospitals")
        .select("group_list")
        .match({ hos_id })
        .single();
      return data;
    },
  });
  return data?.group_list ?? [];
}
