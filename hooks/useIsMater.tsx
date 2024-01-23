import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import useCurrentHospitalId from "./useCurrentHospital";
import { useEffect, useState } from "react";

export default function useIsMater() {
  const [isMaster, setIsMaster] = useState(false);
  const supabase = createSupabaseBrowserClient();
  const hospitalId = useCurrentHospitalId();
  useEffect(() => {
    const getDate = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      const { data: masterId, error: masterIdError } = await supabase
        .from("hospitals")
        .select("matser_id")
        .match({ hos_id: hospitalId })
        .single();
      setIsMaster(user?.id === masterId);
    };

    getDate();
  });
  return isMaster;
}
