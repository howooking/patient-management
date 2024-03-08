import IcuNavbar from "@/components/hospital/icu/navbar/icu-navbar";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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
  const { hos_id } = params;

  const supabase = await createSupabaseServerClient(true);

  const { data: pets, error: petsError } = await supabase
    .from("pets")
    .select()
    .match({ hos_id });

  if (petsError) {
    throw new Error(petsError.message);
  }

  // const { data: vetsAndGroupList, error: vetsAndGroupListError } =
  //   await supabase
  //     .from("hos_vet_mapping")
  //     .select(
  //       `
  //       hospitals (
  //         group_list
  //       ),
  //       nickname
  //     `
  //     )
  //     .match({ hos_id });

  return (
    <div className="relative">
      <IcuNavbar pets={pets} />

      <h2 className="absolute text-xl text-primary font-bold">입원실</h2>

      {/* {inHosPatients.map((patient) => (
        <IcuTable {...patient} key={patient.io_id} />
      ))} */}
    </div>
  );
}
