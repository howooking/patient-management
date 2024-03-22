import { IcuChartJoined } from "@/types/type";
import { useMemo } from "react";
import CopyPrevChartDialog from "./actions/copy-prev-chart-dialog";
import DeleteIoDialog from "./actions/delete-io-dialog";
import OutPatientDialog from "./actions/out-patient-dialog";
import NewChartDialog from "./actions/new-chart-dialog";

export default function IcuChartActions({
  selectedChart,
}: {
  selectedChart?: IcuChartJoined;
}) {
  const isOut = useMemo(
    () => !!selectedChart?.io_id.out_date,
    [selectedChart?.io_id.out_date]
  );
  const isFirstDay = useMemo(
    () => selectedChart?.io_id.in_date === selectedChart?.target_date,
    [selectedChart?.io_id.in_date, selectedChart?.target_date]
  );

  return (
    <>
      <div className="">
        {!isFirstDay && <CopyPrevChartDialog selectedChart={selectedChart} />}

        <NewChartDialog selectedChart={selectedChart} />

        {!selectedChart?.isNext && (
          <>
            {!isOut && <OutPatientDialog selectedChart={selectedChart} />}

            <DeleteIoDialog
              io_id={selectedChart?.io_id.io_id}
              patientName={selectedChart?.pet_id.name}
            />
          </>
        )}

        {/* <TooltipIconButton Icon={PiBookmarkSimple} description="북마크등록" /> */}
      </div>
    </>
  );
}
