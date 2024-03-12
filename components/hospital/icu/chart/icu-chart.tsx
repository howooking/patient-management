"use client";

import useIcuChart from "@/hooks/useIcuChart";
import IcuPatientInfo from "./icu-patient-info";
import IcuTable from "./icu-table";
import { useSelectedIchChart } from "@/lib/store/selected-icu-chart";
import { useMemo } from "react";

export default function IcuChart() {
  const { icuChart } = useIcuChart();
  const { selectedIcuChartId } = useSelectedIchChart();

  const selectedChart = useMemo(
    () =>
      icuChart?.filter((chart) => chart.icu_chart_id === selectedIcuChartId)[0],
    [icuChart, selectedIcuChartId]
  );

  return (
    <div>
      <IcuPatientInfo selectedChart={selectedChart} />
      <IcuTable />
    </div>
  );
}
