import { Database } from "@/lib/supabase/database.types";

export type Pet = Database["public"]["Tables"]["pets"]["Row"];
export type Test = Database["public"]["Tables"]["tests"]["Row"];
export type TestSet = Database["public"]["Tables"]["test_set"]["Row"];
export type Drug = Database["public"]["Tables"]["drugs"]["Row"];
export type DrugDose = Database["public"]["Tables"]["drug_doses"]["Row"];
export type DrugProducts = Database["public"]["Tables"]["drug_products"]["Row"];
export type Feed = Database["public"]["Tables"]["feeds"]["Row"];
