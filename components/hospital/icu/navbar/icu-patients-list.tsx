"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Pet } from "@/types/type";
import { useCallback, useEffect, useState } from "react";
import IcuPatientSelectDialog from "../icu-patient-select-dialog";
import { useSelectedDate } from "@/lib/store/date";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import FilterSelect from "./filter-select";

export type IcuPatient =
  | {
      created_at: string;
      group: string;
      hos_id: string | null;
      in_date: string;
      io_id: number;
      out_date: string | null;
      out_due_date: string;
      pet_id: Pet;
      tag: string | null;
      tag_age: number | null;
    }[]
  | null;

export default function IcuPatientsList({ pets }: { pets: Pet[] }) {
  const supabase = createSupabaseBrowserClient();
  const [icuPatients, setIcuPatients] = useState<IcuPatient>(null);
  const { selectedDate } = useSelectedDate();
  const [refetch, setRefetch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [groupSelect, setGroupSelect] = useState<string>("그룹");
  const [vetSelect, setVetSelect] = useState<string>("수의사");

  useEffect(() => {
    setIsLoading(true);
    const getIcuPatients = async () => {
      const { data } = await supabase
        .from("in_and_out")
        .select(
          `
          *,
          pet_id(*)
          `
        )
        .lte("in_date", format(selectedDate, "yyyy-MM-dd'T'HH:mm:ssxxx"));
      // @ts-ignore
      setIcuPatients(data);
      setIsLoading(false);
    };

    getIcuPatients();
  }, [selectedDate, supabase, refetch]);

  useEffect(() => {
    const channel = supabase
      .channel("in_and_out")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "in_and_out" },
        async (payload) => {
          if (payload) {
            setRefetch((prev) => !prev);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  const filteredIcuPatients = useCallback(
    (group: string, vet: string) => {
      let filtered = icuPatients?.filter(
        (element) =>
          element.out_date === null ||
          element.out_date!.slice(0, 10) >= format(selectedDate, "yyyy-MM-dd")
      );
      if (group !== "그룹") {
        filtered = filtered?.filter((element) => element.group === group);
      }
      // if (vet !== "수의사") {
      //   filtered = filtered?.filter((element) => element. === group);
      // }
      return filtered;
    },
    [icuPatients, selectedDate]
  );

  if (!icuPatients || icuPatients?.length === 0) {
    return (
      <>
        <p className="text-sm">환자없음</p>
        <IcuPatientSelectDialog pets={pets} />
      </>
    );
  }

  return (
    <>
      <FilterSelect
        select={groupSelect}
        setSelect={setGroupSelect}
        options={[...new Set(icuPatients?.map((element) => element.group))]}
        placeholder="그룹"
      />

      <FilterSelect
        select={vetSelect}
        setSelect={setVetSelect}
        options={["김오분", "이구글"]}
        placeholder="수의사"
      />

      {isLoading ? (
        <div className="flex gap-2 itmes-center">
          <Skeleton className="w-10 h-6" />
          <Skeleton className="w-10 h-6" />
          <Skeleton className="w-10 h-6" />
          <Skeleton className="w-10 h-6" />
          <Skeleton className="w-10 h-6" />
          <Skeleton className="rounded-full w-6 h-6" />
        </div>
      ) : (
        <ul className="flex gap-2 items-center">
          {filteredIcuPatients(groupSelect, vetSelect)?.map((patient) => (
            <li key={patient.io_id}>
              <Button size="sm" variant="outline" className="w-10 h-6">
                {patient.pet_id.name}
              </Button>
            </li>
          ))}
          <IcuPatientSelectDialog pets={pets} />
        </ul>
      )}
    </>
  );
}
