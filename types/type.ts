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
