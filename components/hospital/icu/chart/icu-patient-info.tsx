import { IcuChartJoined } from "@/types/type";
import {
  PiBaby,
  PiCat,
  PiDog,
  PiGenderIntersex,
  PiTag,
  PiUser,
  PiCalendarCheck,
  PiCirclesFour,
} from "react-icons/pi";
import { LiaWeightHangingSolid } from "react-icons/lia";
import IcuPatientInfoContainer from "./icu-patient-info-container";
import { convertDaysToYearsMonths } from "@/lib/utils";
import EditWeightDialog from "./edit-dialogs/edit-weight-dialog";
import EditTagDialog from "./edit-dialogs/edit-tag-dialog";
import EditVetDialog from "./edit-dialogs/edit_vet-dialog";

export default function IcuPatientInfo({
  selectedChart,
}: {
  selectedChart?: IcuChartJoined;
}) {
  return (
    <div className="text-sm p-4 grid grid-cols-4 gap-4">
      <IcuPatientInfoContainer
        Icon={selectedChart?.pet_id.species === "canine" ? PiDog : PiCat}
        contents={`${selectedChart?.pet_id.name} (${selectedChart?.pet_id.breed})`}
        title="이름 (품종)"
      />
      <IcuPatientInfoContainer
        Icon={PiGenderIntersex}
        contents={`${selectedChart?.pet_id.gender.toUpperCase()}`}
        title="성별"
      />
      <IcuPatientInfoContainer
        Icon={PiBaby}
        contents={`${convertDaysToYearsMonths(selectedChart?.io_id.tag_age)}`}
        title="나이"
      />
      <IcuPatientInfoContainer
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
        Icon={PiTag}
        contents={`${selectedChart?.io_id.tag}`}
        title="입원사유"
      >
        <EditTagDialog io_id={selectedChart?.io_id.io_id} />
      </IcuPatientInfoContainer>

      <IcuPatientInfoContainer
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
        Icon={PiCalendarCheck}
        contents={`${selectedChart?.io_id.in_date.slice(
          0,
          10
        )} ~ ${selectedChart?.io_id.out_due_date.slice(5, 10)}`}
        title="입원일 ~ 퇴원예정일"
      />
      <IcuPatientInfoContainer
        Icon={PiCirclesFour}
        contents={`${selectedChart?.io_id.group}`}
        title="그룹"
      />

      <p>주의사항:{selectedChart?.caution}</p>
    </div>
  );
}
