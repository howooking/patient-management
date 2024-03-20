import { IcuChartJoined } from "@/types/type";
import DeleteIoDialog from "./actions/delete-io-dialog";
import OutPatientDialog from "./actions/out-patient-dialog";
import NewChartDialog from "./actions/new-chart-dialog";
import CopyPrevDialog from "./actions/copy-prev-dialog";

export default function IcuChartActions({
  selectedIo,
  hasInAndOut,
  hasChart,
  selectedChart,
}: {
  selectedIo?: IcuChartJoined;
  hasInAndOut: boolean;
  hasChart: boolean;
  selectedChart?: IcuChartJoined;
}) {
  const isOut = !!selectedIo?.io_id.out_date;
  const isFirstDay = selectedIo?.io_id.in_date === selectedChart?.target_date;

  return (
    <>
      {hasInAndOut && (
        <div className="">
          {!isFirstDay && <CopyPrevDialog selectedIo={selectedIo} />}

          <NewChartDialog selectedIo={selectedIo} hasChart={hasChart} />

          {hasChart && (
            <>
              <OutPatientDialog
                isOut={isOut}
                io_id={selectedIo?.io_id.io_id}
                patientName={selectedIo?.pet_id.name}
              />

              <DeleteIoDialog
                io_id={selectedIo?.io_id.io_id}
                patientName={selectedIo?.pet_id.name}
              />
            </>
          )}

          {/* <TooltipIconButton Icon={PiBookmarkSimple} description="북마크등록" /> */}
        </div>
      )}
    </>
  );
}
