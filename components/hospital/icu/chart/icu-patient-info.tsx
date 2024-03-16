import { convertDaysToYearsMonths } from "@/lib/utils";
import { IcuChartJoined } from "@/types/type";
import { LiaWeightHangingSolid } from "react-icons/lia";
import {
  PiBaby,
  PiCalendarCheck,
  PiCat,
  PiCirclesFour,
  PiDog,
  PiNote,
  PiTag,
  PiUser,
  PiWarningCircle,
} from "react-icons/pi";
import EditIcuChartTextarea from "./edit-components/edit-Icu-chart-textarea";
import EditGroupDialog from "./edit-components/edit-group-dialog";
import EditIoDateDialog from "./edit-components/edit-io-date-dialog";
import EditTagDialog from "./edit-components/edit-tag-dialog";
import EditWeightDialog from "./edit-components/edit-weight-dialog";
import EditVetDialog from "./edit-components/edit-vet-dialog";
import IcuPatientInfoContainer from "./icu-patient-info-container";
import EditCautionDialog from "./edit-components/edit-caution-dialog";

export default function IcuPatientInfo({
  selectedChart,
}: {
  selectedChart?: IcuChartJoined;
}) {
  return (
    <div className="text-sm p-4 grid grid-cols-12 gap-2">
      <IcuPatientInfoContainer
        className="col-span-3"
        Icon={selectedChart?.pet_id.species === "canine" ? PiDog : PiCat}
        contents={`${selectedChart?.pet_id.name} (${
          selectedChart?.pet_id.breed
        }, ${selectedChart?.pet_id.gender.toUpperCase()})`}
        title="이름 (품종, 성별)"
      />
      <IcuPatientInfoContainer
        className="col-span-3"
        Icon={PiBaby}
        contents={`${convertDaysToYearsMonths(selectedChart?.io_id.tag_age)}`}
        title="나이"
      />
      <IcuPatientInfoContainer
        className="col-span-3"
        Icon={LiaWeightHangingSolid}
        contents={`${selectedChart?.target_weight ?? "측정치 없음"}`}
        title="체중(측정일)"
      >
        <EditWeightDialog
          pet_id={selectedChart?.pet_id.pet_id}
          icu_chart_id={selectedChart?.icu_chart_id}
        />
      </IcuPatientInfoContainer>

      <IcuPatientInfoContainer
        className="col-span-3"
        Icon={PiWarningCircle}
        contents={`${selectedChart?.caution}`}
        title="주의사항"
      >
        <EditCautionDialog
          caution={selectedChart?.caution}
          icu_chart_id={selectedChart?.icu_chart_id}
        />
      </IcuPatientInfoContainer>

      <IcuPatientInfoContainer
        className="col-span-3"
        Icon={PiTag}
        contents={`${selectedChart?.io_id.tag}`}
        title="입원사유"
      >
        <EditTagDialog
          io_id={selectedChart?.io_id.io_id}
          tag={selectedChart?.io_id.tag}
        />
      </IcuPatientInfoContainer>

      <IcuPatientInfoContainer
        className="col-span-3"
        Icon={PiUser}
        contents={`${selectedChart?.main_vet.vet_name} / ${
          selectedChart?.sub_vet?.vet_name ?? "없음"
        }`}
        title="주치의 / 부주치의"
      >
        <EditVetDialog
          main_vet={selectedChart?.main_vet.vet_id}
          sub_vet={selectedChart?.sub_vet?.vet_id ?? "null"}
          icu_chart_id={selectedChart?.icu_chart_id}
        />
      </IcuPatientInfoContainer>

      <IcuPatientInfoContainer
        className="col-span-3"
        Icon={PiCalendarCheck}
        contents={`${selectedChart?.io_id.in_date.slice(
          0,
          10
        )} ~ ${selectedChart?.io_id.out_due_date.slice(5, 10)}`}
        title="입원일 ~ 퇴원예정일"
      >
        <EditIoDateDialog
          io_id={selectedChart?.io_id.io_id}
          in_date={selectedChart?.io_id.in_date}
          out_due_date={selectedChart?.io_id.out_due_date}
        />
      </IcuPatientInfoContainer>

      <IcuPatientInfoContainer
        className="col-span-3"
        Icon={PiCirclesFour}
        contents={`${selectedChart?.io_id.group}`}
        title="그룹"
      >
        <EditGroupDialog
          io_id={selectedChart?.io_id.io_id}
          group={selectedChart?.io_id.group}
        />
      </IcuPatientInfoContainer>

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
