import { convertDaysToYearsMonths } from "@/lib/utils";
import { IcuChart } from "@/types/type";
import { PiCat, PiDog } from "react-icons/pi";

export default function IcuPatientInfo({
  selectedChart,
}: {
  selectedChart?: IcuChart;
}) {
  return (
    <div className="text-sm">
      <div>
        <div className="flex gap-2 items-center text-xl font-bold">
          <div className="flex items-center gap-1">
            {selectedChart?.pet_id.species === "canine" ? (
              <PiDog size={30} />
            ) : (
              <PiCat size={30} />
            )}
            <p>
              {selectedChart?.pet_id.name}({selectedChart?.pet_id.breed})
            </p>
          </div>
          <div>{convertDaysToYearsMonths(selectedChart?.io_id.tag_age)}</div>
          <div>{selectedChart?.pet_id.gender.toUpperCase()}</div>
        </div>
      </div>
      <p>주의사항:{selectedChart?.caution}</p>
      <p>주치의:{selectedChart?.main_vet.vet_name}</p>
      <p>부주치의:{selectedChart?.sub_vet?.vet_name ?? "없음"}</p>
      <p>입원일:{selectedChart?.io_id.in_date}</p>
      <p>퇴원예정일:{selectedChart?.io_id.out_due_date}</p>
      <p>퇴원일:{selectedChart?.io_id.out_date ?? "입원중"}</p>
      <p>입원사유:{selectedChart?.io_id.tag}</p>
      <p>퇴원여부:{selectedChart?.discharged}</p>
      <p>차트 타입:{selectedChart?.type}</p>
      <p>그룹:{selectedChart?.io_id.group}</p>
      <p>털색:{selectedChart?.pet_id.color}</p>
    </div>
  );
}
