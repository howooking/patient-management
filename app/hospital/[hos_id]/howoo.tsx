"use client";

import { useSelectedPet } from "@/lib/store/pets";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function Howoo() {
  const [result, setResult] = useState<any>();

  const { selectedPet } = useSelectedPet();
  const supabase = createSupabaseBrowserClient();
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("test_results")
        .select(
          `*, 
            test_set (
              *,
              tests (
                *
              )
            )
        `
        )
        .match({ pet_id: selectedPet?.pet_id })
        .single();

      if (!error) {
        setResult(data);
      }
    };
    getData();
  }, [selectedPet?.pet_id, supabase]);

  return (
    <div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
