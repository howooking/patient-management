"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function useHospitalGroup(hos_id: string) {
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
