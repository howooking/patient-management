import { IcuChart } from "@/types/type";
import {
  PiBaby,
  PiCat,
  PiDog,
  PiGenderIntersex,
  PiTag,
  PiUserGear,
  PiUser,
  PiCalendarCheck,
  PiCirclesFour,
} from "react-icons/pi";
import IcuPatientInfoCard from "./icu-patient-info-card";
import { convertDaysToYearsMonths } from "@/lib/utils";

export default function IcuPatientInfo({
  selectedChart,
}: {
  selectedChart?: IcuChart;
}) {
  return (
    <div className="text-sm p-4 grid grid-cols-4 gap-4">
      <IcuPatientInfoCard
        Icon={selectedChart?.pet_id.species === "canine" ? PiDog : PiCat}
        contents={`${selectedChart?.pet_id.name} (${selectedChart?.pet_id.breed})`}
        title="이름 (품종)"
      />
      <IcuPatientInfoCard
        Icon={PiGenderIntersex}
        contents={`${selectedChart?.pet_id.gender.toUpperCase()}`}
        title="성별"
      />
      <IcuPatientInfoCard
        Icon={PiBaby}
        contents={`${convertDaysToYearsMonths(selectedChart?.io_id.tag_age)}`}
        title="나이"
      />
      <IcuPatientInfoCard
        Icon={PiTag}
        contents={`${selectedChart?.io_id.tag}`}
        title="입원사유"
      />
      <IcuPatientInfoCard
        Icon={PiUserGear}
        contents={`${selectedChart?.main_vet.vet_name}`}
        title="주치의"
      />
      <IcuPatientInfoCard
        Icon={PiUser}
        contents={`${selectedChart?.sub_vet?.vet_name ?? "없음"}`}
        title="부주치의"
      />
      <IcuPatientInfoCard
        Icon={PiCalendarCheck}
        contents={`${selectedChart?.io_id.in_date.slice(
          0,
          10
        )} ~ ${selectedChart?.io_id.out_due_date.slice(5, 10)}`}
        title="입원일 ~ 퇴원예정일"
      />
      <IcuPatientInfoCard
        Icon={PiCirclesFour}
        contents={`${selectedChart?.io_id.group}`}
        title="그룹"
      />

      <p>주의사항:{selectedChart?.caution}</p>
    </div>
  );
}
