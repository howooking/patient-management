import React from "react";
import IcuPatientInfoContainer from "./icu-patient-info-container";
import { PiNote } from "react-icons/pi";
import EditIcuChartTextarea from "./edit-components/edit-Icu-chart-textarea";
import { type IcuChartJoined } from "@/types/type";

export default function IcuMemo({
  selectedChart,
}: {
  selectedChart: IcuChartJoined;
}) {
  return (
    <div className="text-sm p-2 grid grid-cols-12 gap-2">
      <IcuPatientInfoContainer
        Icon={PiNote}
        title="메모_A"
        className="col-span-4"
      >
        <EditIcuChartTextarea
          text={selectedChart?.memo_a}
          memoType="a"
          icu_chart_id={selectedChart?.icu_chart_id}
        />
      </IcuPatientInfoContainer>

      <IcuPatientInfoContainer
        Icon={PiNote}
        title="메모_B"
        className="col-span-4"
      >
        <EditIcuChartTextarea
          text={selectedChart?.memo_b}
          memoType="b"
          icu_chart_id={selectedChart?.icu_chart_id}
        />
      </IcuPatientInfoContainer>

      <IcuPatientInfoContainer
        Icon={PiNote}
        title="메모_C"
        className="col-span-4"
      >
        <EditIcuChartTextarea
          text={selectedChart?.memo_c}
          memoType="c"
          icu_chart_id={selectedChart?.icu_chart_id}
        />
      </IcuPatientInfoContainer>
    </div>
  );
}
