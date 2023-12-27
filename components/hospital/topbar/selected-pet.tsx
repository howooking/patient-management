"use client";

import { useSelectedPet } from "@/lib/store/pets";
import SelectedPetDialog from "./selected-pet-dialog";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SelectedPet() {
  const [latestWeight, setLatestWeight] = useState<string>();

  const { selectedPet } = useSelectedPet();
  const supabase = createSupabaseBrowserClient();
  useEffect(() => {
    const getData = async () => {
      const { data: weights, error } = await supabase
        .from("test_results")
        .select("result")
        .match({
          pet_id: selectedPet?.pet_id,
          test_id: "43f6b6aa-a9a9-4bc8-8d0f-6a3117d32ff5",
        })
        .order("created_at", { ascending: false });

      if (!error) {
        if (weights.length > 0) {
          setLatestWeight(weights[0].result);
        } else {
          setLatestWeight(undefined);
        }
      }
    };
    getData();
  }, [selectedPet?.pet_id, supabase]);

  if (!selectedPet) {
    return;
  }
  return (
    <SelectedPetDialog selectedPet={selectedPet} latestWeight={latestWeight} />
  );
}
