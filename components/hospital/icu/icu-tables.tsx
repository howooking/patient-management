"use client";

import useIcuChart from "@/hooks/useIcuChart";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { InAndOut, Pet, Vet } from "@/types/type";
import { useEffect } from "react";

export type SingleIcuChart = {
  caution: string | null;
  created_at: string;
  discharged: boolean;
  hos_id: string;
  icu_chart_id: number;
  io_id: InAndOut;
  main_vet: Vet;
  pet_id: Pet;
  sub_vet: Vet;
  tag: string | null;
  target_date: string | null;
  type: string;
};

export type IcuChart = SingleIcuChart[] | null | undefined;

export default function IcuTables() {
  const supabase = createSupabaseBrowserClient();

  const { icuChart, isLoading } = useIcuChart();

  // const selectedIcuPatient = useMemo(
  //   () =>
  //     icuChart?.filter(
  //       (element) => element.pet_id.pet_id === selectedIcuPatientId
  //     )[0],
  //   [icuChart, selectedIcuPatientId]
  // );

  useEffect(() => {
    const channel = supabase
      .channel("icu_chart")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "icu_chart" },
        async (payload) => {
          // if (payload) {
          //   setRefetch((prev) => !prev);
          // }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  return <></>;
}
