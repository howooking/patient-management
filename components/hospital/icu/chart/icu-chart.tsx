"use client";

import useIcuChart from "@/hooks/useIcuChart";
import useIcuChartTx from "@/hooks/useIcuChartTx";
import { useSelectedIcuChart } from "@/lib/store/selected-icu-chart";
import { useSelectedIcuIo } from "@/lib/store/selected-icu-io";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useCallback, useEffect, useMemo } from "react";
import IcuChartActions from "./icu-chart-actions";
import IcuMemo from "./icu-memo";
import IcuPatientInfo from "./icu-patient-info";
import IcuTable from "./table/icu-table";

export default function IcuChart() {
  const supabase = createSupabaseBrowserClient();
  const queryClient = useQueryClient();
  const { selectedIcuChartId, setSelectedIcuChartId } = useSelectedIcuChart();
  const { selectedIcuIoId, setSelectedIcuIoId } = useSelectedIcuIo();

  // in_and_out websocket
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

  // icu_chart websocket
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

  // icu_chart_tx websocket
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

  // tx websocket
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

  // test_results websocket / for realtime patient's weight
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

  const { icuChart } = useIcuChart();
  const { icuChartTx } = useIcuChartTx();

  const selectedChart = useMemo(
    () => icuChart?.find((chart) => chart.icu_chart_id === selectedIcuChartId),
    [icuChart, selectedIcuChartId]
  );

  const selectedIo = useMemo(
    () => icuChart?.find((chart) => chart.io_id.io_id === selectedIcuIoId),
    [icuChart, selectedIcuIoId]
  );

  // tx data of selected chart
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

  // console.log({
  //   selectedIo,
  //   selectedChart,
  //   selectedIcuIoId,
  //   selectedIcuChartId,
  // });

  const chartState = useCallback(() => {
    if (!selectedChart?.target_date) {
      return undefined;
    }
    const today = format(new Date(), "yyyy-MM-dd");
    if (selectedChart?.target_date === today) {
      return "today";
    }
    if (selectedChart?.target_date < today) {
      return "past";
    }
  }, [selectedChart?.target_date]);

  if (!selectedIcuIoId) {
    return <>전체현황</>;
  }

  return (
    <div>
      <IcuChartActions
        selectedIo={selectedIo}
        hasInAndOut={!!selectedIo}
        hasChart={!!selectedChart}
        selectedChart={selectedChart}
      />

      {selectedChart ? (
        <>
          <IcuPatientInfo selectedChart={selectedChart} />
          <IcuTable
            selectedChartTx={selectedChartTx}
            chartState={chartState()}
          />
          <IcuMemo selectedChart={selectedChart} />
        </>
      ) : null}
    </div>
  );
}
