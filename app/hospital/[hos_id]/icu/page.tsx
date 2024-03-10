import IcuNavbar from "@/components/hospital/icu/navbar/icu-navbar";
import { InAndOut, Vet } from "@/types/type";

export type InHosPatients = {
  icu_chart_id: number;
  io_id: InAndOut;
  target_date: Date;
  type: string;
  tag: string;
  created_at: Date;
  discharged: boolean;
  main_vet: Vet;
  sub_vet: Vet;
  caution: null;
  hos_id: string;
};

export default async function IcuPage({
  params,
}: {
  params: { hos_id: string };
}) {
  return (
    <div className="relative">
      <IcuNavbar hos_id={params.hos_id} />

      <h2 className="absolute text-xl text-primary font-bold">입원실</h2>

      {/* {inHosPatients.map((patient) => (
        <IcuTable {...patient} key={patient.io_id} />
      ))} */}
    </div>
  );
}
