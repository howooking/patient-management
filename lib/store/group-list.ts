/* eslint-disable unused-imports/no-unused-vars */
import { create } from "zustand";
import { createSupabaseBrowserClient } from "../supabase/client";

type HosGroupListState = {
  hosGroupList: string[];
  setHosGroupList: (hospitalId: string) => void;
};
const supabase = createSupabaseBrowserClient();

export const useHosGroupList = create<HosGroupListState>()((set) => ({
  hosGroupList: [],
  setHosGroupList: async (hospitalId) => {
    const { data } = await supabase
      .from("hospitals")
      .select("group_list")
      .match({ hos_id: hospitalId })
      .single();

    set({ hosGroupList: data?.group_list });
  },
}));
