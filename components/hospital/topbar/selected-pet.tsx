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
          test_id: "5382e813-9151-4fcb-8e99-4de210f9e129", // 체중 test_id
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
