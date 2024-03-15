"use client";

import useIcuChart from "@/hooks/useIcuChart";
import useIcuChartTx from "@/hooks/useIcuChartTx";
import { useSelectedIchChart } from "@/lib/store/selected-icu-chart";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import IcuPatientInfo from "./icu-patient-info";
import IcuTable from "./icu-table";

export default function IcuChart() {
  // 웹소켓
  const supabase = createSupabaseBrowserClient();
  const queryClient = useQueryClient();
  const { selectedIcuChartId, setSelectedIcuChartId } = useSelectedIchChart();

  // in_and_out
  useEffect(() => {
    const channel = supabase
      .channel("in_and_out")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "in_and_out" },
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
  }, [queryClient, setSelectedIcuChartId, supabase]);

  // icu_chart
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
            setSelectedIcuChartId(payload.new.icu_chart_id);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "icu_chart" },
        async (payload) => {
          if (payload) {
            queryClient.invalidateQueries({
              queryKey: [`icu_chart`],
            });
            setSelectedIcuChartId(payload.new.icu_chart_id);
          }
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, setSelectedIcuChartId, supabase]);

  // icu_chart_tx
  useEffect(() => {
    const channel = supabase
      .channel("icu_chart_tx")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "icu_chart_tx" },
        async (payload) => {
          if (payload) {
            queryClient.invalidateQueries({
              queryKey: [`icu_chart_tx`],
            });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "icu_chart_tx" },
        async (payload) => {
          if (payload) {
            queryClient.invalidateQueries({
              queryKey: [`icu_chart_tx`],
            });
          }
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, setSelectedIcuChartId, supabase]);

  // tx
  useEffect(() => {
    const channel = supabase
      .channel("tx")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "tx" },
        async (payload) => {
          if (payload) {
            queryClient.invalidateQueries({
              queryKey: ["icu_chart_tx"],
            });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tx" },
        async (payload) => {
          if (payload) {
            queryClient.invalidateQueries({
              queryKey: ["icu_chart_tx"],
            });
          }
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, setSelectedIcuChartId, supabase]);

  // test_results
  useEffect(() => {
    const channel = supabase
      .channel("test_results")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "test_results" },
        async (payload) => {
          if (payload) {
            queryClient.invalidateQueries({
              queryKey: ["icu_chart"],
            });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "test_results" },
        async (payload) => {
          if (payload) {
            queryClient.invalidateQueries({
              queryKey: ["icu_chart"],
            });
          }
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, setSelectedIcuChartId, supabase]);

  // chart
  const { icuChart, isLoading: icuChartLoading } = useIcuChart();
  const selectedChart = useMemo(
    () => icuChart?.find((chart) => chart.icu_chart_id === selectedIcuChartId),
    [icuChart, selectedIcuChartId]
  );

  // chart_tx
  const { icuChartTx, isLoading: icuChartTxLoading } = useIcuChartTx();
  const selectedChartTx = useMemo(
    () =>
      icuChartTx?.filter(
        (element) => element.icu_chart_id === selectedIcuChartId
      ),
    [icuChartTx, selectedIcuChartId]
  );

  // // tx
  // const { tx, isLoading: txLoading } = useTx();
  // const selectedTx = useMemo(
  //   () =>
  //     tx?.filter(
  //       (element) => element.icu_chart_tx_id.icu_chart_id === selectedIcuChartId
  //     ),
  //   [selectedIcuChartId, tx]
  // );

  return (
    <div>
      {selectedIcuChartId === 0 ? (
        <>전체현황</>
      ) : (
        <>
          <IcuPatientInfo selectedChart={selectedChart} />
          <IcuTable selectedChartTx={selectedChartTx} />
        </>
      )}
    </div>
  );
}
