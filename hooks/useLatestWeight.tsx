import { WEIGHT_TEST_ID } from "@/constants/weight-test-id";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function useLatestWeight(petId?: number) {
  const supabase = createSupabaseBrowserClient();
  const [latestWeight, setLatestWeight] = useState<string | undefined>(
    undefined
  );
  const [weighedDate, setWeighedDate] = useState<string | undefined>();

  useEffect(() => {
    const getWeight = async () => {
      const { data: weights } = await supabase
        .from("test_results")
        .select("result, created_at")
        .match({
          pet_id: petId,
          test_id: WEIGHT_TEST_ID,
        })
        .order("created_at", { ascending: false });

      if (weights && weights.length > 0) {
        setLatestWeight(weights[0].result);
        setWeighedDate(weights[0].created_at?.slice(0, 10));
      } else {
        setLatestWeight(undefined);
        setWeighedDate(undefined);
      }
    };
    getWeight();
  }, [petId, supabase]);

  return { latestWeight, weighedDate };
}
