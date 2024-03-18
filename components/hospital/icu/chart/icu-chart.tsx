"use client";

import useIcuChart from "@/hooks/useIcuChart";
import useIcuChartTx from "@/hooks/useIcuChartTx";
import { useSelectedIcuChart } from "@/lib/store/selected-icu-chart";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import IcuPatientInfo from "./icu-patient-info";
import IcuTable from "./table/icu-table";
import { useSelectedDate } from "@/lib/store/selected-date";
import IcuChartActions from "./icu-chart-actions";
import { useSelectedIcuIo } from "@/lib/store/selected-icu-io";
import { type IcuChartJoined, type IcuChartTxJoined } from "@/types/type";
import IcuMemo from "./icu-memo";

export default function IcuChart() {
  // 웹소켓
  const supabase = createSupabaseBrowserClient();
  const queryClient = useQueryClient();
  const { selectedIcuChartId, setSelectedIcuChartId } = useSelectedIcuChart();
  const { selectedIcuIoId, setSelectedIcuIoId } = useSelectedIcuIo();

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
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "in_and_out" },
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
            setSelectedIcuIoId(payload.new.io_id);
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
          }
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, setSelectedIcuChartId, setSelectedIcuIoId, supabase]);

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
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "icu_chart_tx" },
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
  }, [queryClient, supabase]);

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
  }, [queryClient, supabase]);

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
  }, [queryClient, supabase]);

  // chart
  const { selectedDate } = useSelectedDate();
  const { icuChart, isLoading: icuChartLoading } = useIcuChart();
  const selectedChart = useMemo(
    () =>
      (icuChart as IcuChartJoined[] | null)
        ?.filter((chart) => chart.target_date === selectedDate)
        .find((chart) => chart.icu_chart_id === selectedIcuChartId),
    [icuChart, selectedDate, selectedIcuChartId]
  );

  // io
  const selectedIo = useMemo(
    () =>
      (icuChart as IcuChartJoined[] | null)
        ?.filter((chart) => chart.io_id.in_date <= selectedDate)
        .find((chart) => chart.io_id.io_id === selectedIcuIoId),
    [icuChart, selectedDate, selectedIcuIoId]
  );

  // chart_tx
  const { icuChartTx, isLoading: icuChartTxLoading } = useIcuChartTx();
  const selectedChartTx = useMemo(
    () =>
      (icuChartTx as IcuChartTxJoined[] | null)?.filter(
        (element) => element.icu_chart_id === selectedIcuChartId
      ),
    [icuChartTx, selectedIcuChartId]
  );
  // console.log(selectedChartTx);

  // // tx
  // const { tx, isLoading: txLoading } = useTx();
  // const selectedTx = useMemo(
  //   () =>
  //     tx?.filter(
  //       (element) => element.icu_chart_tx_id.icu_chart_id === selectedIcuChartId
  //     ),
  //   [selectedIcuChartId, tx]
  // );

  // console.log({
  //   selectedIo,
  //   selectedChart,
  //   selectedIcuIoId,
  //   selectedIcuChartId,
  // });

  // useEffect(() => {
  //   if (!selectedIo && !selectedChart) {
  //     setSelectedIcuChartId(undefined);
  //     setSelectedIcuIoId(undefined);
  //   }
  // }, [selectedChart, selectedIo, setSelectedIcuChartId, setSelectedIcuIoId]);

  if (!selectedIcuIoId) {
    return <>전체현황</>;
  }

  return (
    <div>
      <IcuChartActions selectedIo={selectedIo} hasChart={!!selectedChart} />

      {selectedChart ? (
        <>
          <IcuPatientInfo selectedChart={selectedChart} />
          <IcuTable selectedChartTx={selectedChartTx} />
          <IcuMemo selectedChart={selectedChart} />
        </>
      ) : null}
    </div>
  );
}
