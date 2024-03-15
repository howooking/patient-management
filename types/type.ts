import { Database } from "@/lib/supabase/database.types";

export type Pet = Database["public"]["Tables"]["pets"]["Row"];
export type Vet = Database["public"]["Tables"]["vets"]["Row"];
export type Test = Database["public"]["Tables"]["tests"]["Row"];
export type TestSet = Database["public"]["Tables"]["test_set"]["Row"];
export type Drug = Database["public"]["Tables"]["drugs"]["Row"];
export type DrugDose = Database["public"]["Tables"]["drug_doses"]["Row"];
export type DrugProducts = Database["public"]["Tables"]["drug_products"]["Row"];
export type Feed = Database["public"]["Tables"]["feeds"]["Row"];
export type InAndOut = Database["public"]["Tables"]["in_and_out"]["Row"];
export type IcuChart = Database["public"]["Tables"]["icu_chart"]["Row"];
export type IcuChartTx = Database["public"]["Tables"]["icu_chart_tx"]["Row"];
export type Tx = Database["public"]["Tables"]["tx"]["Row"];

export type IcuChartJoined = Omit<
  IcuChart,
  "io_id" | "pet_id" | "main_vet" | "sub_bet"
> & {
  io_id: InAndOut;
  pet_id: Pet;
  main_vet: Vet;
  sub_vet: Vet;
};

export type IcuChartTxJoined = Omit<
  IcuChartTx,
  | "done_1"
  | "done_2"
  | "done_3"
  | "done_4"
  | "done_5"
  | "done_6"
  | "done_7"
  | "done_8"
  | "done_9"
  | "done_10"
  | "done_11"
  | "done_12"
  | "done_13"
  | "done_14"
  | "done_15"
  | "done_16"
  | "done_17"
  | "done_18"
  | "done_19"
  | "done_20"
  | "done_21"
  | "done_22"
  | "done_23"
  | "done_24"
  | "io_id"
> & {
  done_1: Tx | null;
  done_2: Tx | null;
  done_3: Tx | null;
  done_4: Tx | null;
  done_5: Tx | null;
  done_6: Tx | null;
  done_7: Tx | null;
  done_8: Tx | null;
  done_9: Tx | null;
  done_10: Tx | null;
  done_11: Tx | null;
  done_12: Tx | null;
  done_13: Tx | null;
  done_14: Tx | null;
  done_15: Tx | null;
  done_16: Tx | null;
  done_17: Tx | null;
  done_18: Tx | null;
  done_19: Tx | null;
  done_20: Tx | null;
  done_21: Tx | null;
  done_22: Tx | null;
  done_23: Tx | null;
  done_24: Tx | null;
  io_id: InAndOut;
};

export type TxJoined = {
  created_at: string;
  icu_chart_tx_id: IcuChartTx;
  images: string[] | null;
  io_id: InAndOut;
  log: string[] | null;
  memo: string | null;
  result: string | null;
  time: string | null;
  tx_id: number;
};
