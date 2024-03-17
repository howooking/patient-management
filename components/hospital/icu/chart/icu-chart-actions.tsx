import { IcuChartJoined } from "@/types/type";
import DeleteIoDialog from "./actions/delete-io-dialog";
import OutPatientDialog from "./actions/out-patient-dialog";
import ResetChartDialog from "./actions/reset-chart-dialog";

export default function IcuChartActions({
  selectedIo,
  hasChart,
}: {
  selectedIo?: IcuChartJoined;
  hasChart: boolean;
}) {
  const isOut = !!selectedIo?.io_id.out_date;

  return (
    <div>
      {hasChart ? (
        <>
          <OutPatientDialog
            isOut={isOut}
            io_id={selectedIo?.io_id.io_id}
            patientName={selectedIo?.pet_id.name}
          />

          <ResetChartDialog selectedIo={selectedIo} />

          <DeleteIoDialog
            io_id={selectedIo?.io_id.io_id}
            patientName={selectedIo?.pet_id.name}
          />

          {/* <TooltipIconButton Icon={PiBookmarkSimple} description="북마크등록" /> */}
        </>
      ) : (
        <>
          {/* <TooltipIconButton
            Icon={PiClipboardText}
            description="전일차트 복사"
          />

          <TooltipIconButton Icon={PiFilePlus} description="기본차트 생성" />

          <TooltipIconButton
            Icon={PiClipboardText}
            description="북마크 차트 붙여넣기"
          /> */}
        </>
      )}
    </div>
  );
}
