"use client";

import { useSelectedPet } from "@/lib/store/pets";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import SelectedPetDialog from "./selected-pet-dialog";

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
          test_id: "5a3e166a-4962-4cb9-9cbc-dbc1ce2c8cdc", // 체중 test_id
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
    selectedPet && getData();
  }, [selectedPet, selectedPet?.pet_id, supabase]);

  if (!selectedPet) {
    return;
  }
  return (
    <SelectedPetDialog selectedPet={selectedPet} latestWeight={latestWeight} />
  );
}
